import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import membershipRoutes from './routes/membershipRoutes';

const app: Express = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/controlla')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Enable CORS for all routes
app.use(cors());

// Use routes
app.use('/api/memberships', membershipRoutes);

const port: string | number = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
