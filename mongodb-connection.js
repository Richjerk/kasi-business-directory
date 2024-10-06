require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

// MongoDB connection URI
const uri = `mongodb+srv://puseletso55:${process.env.DB_PASSWORD}@south-africa-businesses-3q47b.a.query.mongodb.net/VirtualDatabase?retryWrites=true&w=majority`;

// Connect to MongoDB
const connectToDB = async () => {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db("VirtualDatabase"); // Use your actual database name
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err; // Rethrow the error for further handling if necessary
  }
};

// Function to get the database instance
const getDB = () => {
  if (!db) {
    throw new Error("Database not connected!");
  }
  return db;
};

// Export the connection functions
module.exports = { connectToDB, getDB };


