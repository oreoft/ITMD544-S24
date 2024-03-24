// resolvers.js

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
    Query: {
        users: async () => await prisma.user.findMany(),
        movies: async () => await prisma.movie.findMany(),
        reviews: async () => await prisma.review.findMany(),
    },
    Mutation: {
        createUser: async (_, args) => {
            return await prisma.user.create({
                data: args,
            });
        },
        createMovie: async (_, args) => {
            return await prisma.movie.create({
                data: {
                    title: args.title,
                    year: args.year,
                    user: {
                        connect: {id: args.userId},
                    },
                },
            });
        },
        createReview: async (_, args) => {
            return await prisma.review.create({
                data: {
                    content: args.content,
                    rating: args.rating,
                    movie: {
                        connect: {id: args.movieId},
                    },
                    user: {
                        connect: {id: args.userId},
                    },
                },
            });
        },
    },
    User: {
        reviews: async (parent) => await prisma.user.findUnique({where: {id: parent.id}}).reviews(),
        movies: async (parent) => await prisma.user.findUnique({where: {id: parent.id}}).movies(),
    },
    Movie: {
        reviews: async (parent) => await prisma.movie.findUnique({where: {id: parent.id}}).reviews(),
        user: async (parent) => await prisma.movie.findUnique({where: {id: parent.id}}).user(),
    },
    Review: {
        movie: async (parent) => await prisma.review.findUnique({where: {id: parent.id}}).movie(),
        user: async (parent) => await prisma.review.findUnique({where: {id: parent.id}}).user(),
    },
};

module.exports = resolvers;

