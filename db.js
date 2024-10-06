// db.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDB() {
  try {
    // Ensure DB_PASSWORD is set in the .env file
    const dbPassword = process.env.DB_PASSWORD;
    if (!dbPassword) {
      throw new Error("DB_PASSWORD is undefined. Check your .env file.");
    }

    // Create the MongoDB connection URI
    const uri = `mongodb+srv://puseletso55:${dbPassword}@south-africa-businesses-3q47b.a.query.mongodb.net/VirtualDatabase?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    await client.connect();
    db = client.db("businessDirectory"); // Your database name
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not connected!");
  }
  return db;
}

// Exporting the functions
module.exports = { connectToDB, getDB };


