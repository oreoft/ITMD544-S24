# ITMD-544-Lab3

This project is a web application designed for movie enthusiasts to manage their movie collections. It allows users to
add movies, write reviews, and associate those reviews with movies and users. The application features a backend API
developed with Express.js and Apollo Server for GraphQL integration, a Prisma ORM for database operations, and a simple
UI for demonstrating CRUD operations.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete movies, users, and reviews.
- **GraphQL API**: Typed queries and mutations for interacting with the movie collection.
- **Relational Database**: Utilizes a relational database with tables for users, movies, and reviews.
- **ORM with Prisma**: Simplifies database operations using Prisma ORM.

## Technologies

- Node.js
- Express.js
- Apollo Server for GraphQL
- Prisma ORM
- Relational Database (MySQL)
- (Optional) Frontend technology for UI

## Getting Started

### Prerequisites

- Node.js installed
- A relational database setup (MySQL)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/oreoft/ITMD544-S24.git && cd lab3/backend
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```
3. Configure your database connection in `prisma/schema.prisma`.
4. Run the Prisma migrations:
   ```sh
   npx prisma migrate dev
   ```
5. Start the backend server:
   ```sh
   node index.js
   ```
6. Start the frontend
   ```sh
   cd ../frontend && npm install && npm start
   ```

## Usage

The application supports the following operations:

- **Adding Users/Movies/Reviews**: Use the provided endpoints or GraphQL mutations.
- **Fetching Movies with Reviews**: Query the database using GraphQL or REST API.
- **Updating and Deleting Records**: Utilize the respective endpoints for managing the data.

## API Endpoints

- **Create User**: `POST /users`
- **Create Movie**: `POST /movies`
- **Create Review**: `POST /reviews`
- **Get Movies**: `GET /movies`
- **Get Movie by ID (with reviews)**: `GET /movies/:id`
- **Delete Movie**: `DELETE /movies/:id`
- **Get Users**: `GET /users`

## GraphQL Operations

- **Query Movies**: Shows how to fetch movies with their associated reviews and user information.

## Deployment

This application is deployed in the cloud. Here are the relevant URLs:

- **GitHub URL**: https://github.com/oreoft/ITMD544-S24.git
- **Website URL**: http://itmd544-lab3-yifan.someget.work
- **Web API URL**: http://itmd544-lab3-api-yifan.someget.work

## Screenshots

- **DataGrip**: ![img.png](datagrip.png)
- **GraphQL Endpoint**: (Partial display only)
    - user(query) ![img_4.png](img_4.png)
    - review(create) ![img_5.png](img_5.png)
    - user(delete) ![img_6.png](img_6.png)
    - user(update) ![img_7.png](img_7.png)
    - .....
- **PostMan Endpoint**: (Partial display only)
    - users(get)![img.png](img.png)
    - users(post)![img_1.png](img_1.png)
    - movies(post)![img_2.png](img_2.png)
    - movies(delete)![img_3.png](img_3.png)
    - .....

## Contact

Oreoft - [meetyifan@gmail.com]
