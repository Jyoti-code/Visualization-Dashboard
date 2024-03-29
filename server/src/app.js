const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Data = require('./models/Data');
const apiRoutes = require('./routes/api');
require('dotenv').config({ path: './src/.env' });

const app = express();

console.log('MongoDB URI->', process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  console.log('Database:', mongoose.connection.db.databaseName);
  console.log('Collection:', Data.collection.name);
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Routes
app.use('/api', apiRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
