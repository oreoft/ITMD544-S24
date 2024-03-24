const express = require('express');
const {PrismaClient} = require('@prisma/client');
const {ApolloServer, gql} = require('apollo-server-express');
const cors = require('cors');
const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', async (req, res) => {
    const {name, email} = req.body;
    try {
        const user = await prisma.user.create({
            data: {name, email},
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

app.post('/movies', async (req, res) => {
    const {title, year, userId} = req.body;
    try {
        const movie = await prisma.movie.create({
            data: {title, year, userId},
        });
        res.json(movie);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

app.post('/reviews', async (req, res) => {
    const {movieId, content, rating, userId} = req.body;
    try {
        const review = await prisma.review.create({
            data: {
                content,
                rating,
                user: {
                    connect: {id: userId},
                },
                movie: {
                    connect: {id: movieId},
                },
            },
        });
        res.json(review);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

app.get('/movies/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const movie = await prisma.movie.findUnique({
            where: {id: parseInt(id)},
            include: {
                user: true, // 包含关联的用户信息
                reviews: true, // 包含所有评论
            },
        });
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({error: "Movie not found"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.delete('/movies/:id', async (req, res) => {
    const {id} = req.params; // 从 URL 参数中获取电影 ID
    try {
        // 使用 Prisma 客户端删除电影
        const movie = await prisma.movie.delete({
            where: {
                id: parseInt(id), // 确保 id 是一个数字
            },
        });
        res.json({message: "Movie deleted successfully", movie});
    } catch (error) {
        // 如果出现错误（例如，找不到对应的电影），返回错误信息
        res.status(400).json({error: error.message});
    }
});


app.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany(
        {
            include: {
                reviews: true, // 确保包含 reviews
            },
        }
    );
    res.json(movies);
});

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// GraphQL schema和resolver
const typeDefs = gql`
  type Query {
    movies: [Movie!]!
  }

  type Movie {
    id: ID!
    title: String!
    year: Int!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

const resolvers = {
    Query: {
        movies: () => prisma.movie.findMany(),
    },
};

const server = new ApolloServer({typeDefs, resolvers});

// 修改部分
async function startApolloServer() {
    await server.start();
    server.applyMiddleware({app});

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startApolloServer();
