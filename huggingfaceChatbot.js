// huggingfaceChatbot.js

const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

// Initialize the Hugging Face Inference client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Function to get a response from the Hugging Face model
async function getHuggingfaceResponse(userInput) {
  try {
    const response = await hf.textGeneration({
      model: 'gpt2', // Example model, can be changed to any other model from Hugging Face
      inputs: userInput,
    });
    
    return response.generated_text; // Return the generated text from the model
  } catch (error) {
    console.error('Error fetching response from Huggingface API:', error);
    return 'Sorry, I am unable to process your request at the moment.'; // User-friendly error message
  }
}

// Example usage of the chatbot function
getHuggingfaceResponse("Tell me about small businesses.")
  .then(response => console.log('Chatbot response:', response))
  .catch(err => console.error('Error:', err));


