// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const membershipRoutes = require('./routes/membershipRoutes');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

// Use routes
app.use('/api/memberships', membershipRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
