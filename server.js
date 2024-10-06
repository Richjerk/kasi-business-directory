// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { sendEmail } = require('./contact'); // Adjust the path as necessary
const validateFormInput = require('./formValidation'); // Adjust the path as needed
const businessRoutes = require('./businessRoutes'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

// MongoDB connection
const mongoURI = process.env.MONGO_URI; // Ensure MONGO_URI is correctly loaded
if (!mongoURI) {
  console.error("MONGO_URI is undefined. Check your .env file.");
  process.exit(1); // Exit if MONGO_URI is not set
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Business Schema
const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  imageUrl: { type: String }
});

const Business = mongoose.model('Business', businessSchema);

// Use business routes
app.use('/api', businessRoutes); // This sets a base path for the routes

// Route: Register a business
app.post('/api/register-business', async (req, res) => { // Updated the endpoint to include /api
  try {
    const { name, description, email, phone, address, imageUrl } = req.body;
    const newBusiness = new Business({ name, description, email, phone, address, imageUrl });
    await newBusiness.save();
    res.status(201).json({ message: 'Business registered successfully!' });
  } catch (error) {
    console.error('Error registering business:', error);
    res.status(500).json({ message: 'Error registering business', error });
  }
});

// Route: Get all listed businesses
app.get('/api/businesses', async (req, res) => { // Updated the endpoint to include /api
  try {
    const businesses = await Business.find({});
    res.status(200).json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ message: 'Error fetching businesses', error });
  }
});

// Route: Search for businesses by name (case-insensitive)
app.get('/api/search-business', async (req, res) => { // Updated the endpoint to include /api
  const { query } = req.query; // Get the search query from the query string
  
  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    // Using MongoDB's $regex for a case-insensitive search on business name
    const searchResults = await Business.find({ 
      name: { $regex: query, $options: 'i' } // 'i' makes it case-insensitive
    });

    if (searchResults.length === 0) {
      return res.status(200).json({ message: 'No businesses found for your query.' });
    }

    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error searching for businesses:', error);
    res.status(500).json({ message: 'Error searching for businesses', error });
  }
});

// Route to handle contact form submissions
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
      await sendEmail(name, email, message);
      res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({ message: 'Failed to send email', error });
  }
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const { sanitizedInputs, errors } = validateFormInput(req);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // If validation passes, proceed with your logic (e.g., saving to the database)
  res.status(200).json({ success: true, data: sanitizedInputs });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




