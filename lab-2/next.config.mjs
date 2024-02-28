import {setupDatabase} from "./src/dao/database.js";

const nextConfig = {};

try {
    setupDatabase().then(r => console.log('Database setup completed.'));
} catch (error) {
    console.error('Failed to setup database or start server:', error);
}

export default nextConfig;


