// schema.js
const {gql} = require('apollo-server-express');

// GraphQL类型定义
const typeDefs = gql`
  type Query {
    movies: [Movie]
  }

  type Movie {
    id: ID!
    title: String!
    year: Int
  }

  type Mutation {
    addMovie(title: String!, year: Int!): Movie
  }
`;

// 解析器
const resolvers = {
    Query: {
        movies: async (_, __, {prisma}) => {
            return await prisma.movie.findMany();
        },
    },
    Mutation: {
        addMovie: async (_, {title, year}, {prisma}) => {
            return await prisma.movie.create({
                data: {
                    title,
                    year,
                },
            });
        },
    },
};

module.exports = {typeDefs, resolvers};

