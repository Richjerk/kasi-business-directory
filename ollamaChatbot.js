const axios = require('axios');

// Function to send user input to Ollama and get a response
async function getOllamaResponse(userInput) {
  try {
    // Assuming Ollama has a POST endpoint to send queries
    const response = await axios.post('https://api.ollama.ai/chat', {
      prompt: userInput,  // User input sent to Ollama's API
    });

    // Extract the response data
    const reply = response.data.response;  // Updated to 'response' assuming that is the correct field

    console.log("Ollama's response:", reply);
    return reply;
  } catch (error) {
    console.error('Error interacting with Ollama API:', error);
    return 'Sorry, I am having trouble responding right now.';
  }
}

// Example of how to use this function with a chatbot input
const userInput = "Hello, how can you assist me?"; // Example user input

getOllamaResponse(userInput)
  .then(response => {
    console.log("Chatbot's reply:", response); // Output the chatbot's reply
  })
  .catch(err => {
    console.error('Failed to get response from Ollama:', err);
  });

// apiService.js

// Fetch businesses from the API
export const getBusinesses = async () => {
  try {
    const response = await fetch(`${process.env.API_SERVICE}/businesses`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

