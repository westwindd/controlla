import express, { Express } from 'express';
import mongoose from 'mongoose';
import membershipRoutes from './routes/membershipRoutes'; // Ensure your membershipRoutes are exported correctly in TypeScript

const app: Express = express();
app.use(express.json()); // Using Express's built-in body parser

// MongoDB connection
mongoose.connect('mongodb://localhost/controlla')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Use routes
app.use('/api/memberships', membershipRoutes);

const port: string | number = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
