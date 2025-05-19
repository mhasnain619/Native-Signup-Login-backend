import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import userRoutes from './router/routes.js'
import { connectDatabase } from './dataBase/dataBase.js';


const app = express();
const PORT = process.env.PORT

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// user routes
app.use('/has', userRoutes)

connectDatabase()
// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, World! backend running' });
});

