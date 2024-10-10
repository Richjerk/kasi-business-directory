// netlify/functions/getBusinessList.js

const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  // Connect to MongoDB
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const database = client.db('your-database-name'); // Replace with your database name
    const businesses = database.collection('businesses'); // Replace with your collection name

    // Query to get all businesses
    const businessList = await businesses.find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(businessList),
    };
  } catch (error) {
    console.error('Error fetching business list:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  } finally {
    await client.close();
  }
};
