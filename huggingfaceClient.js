// Import the Huggingface Inference Client
const { InferenceClient } = require('huggingface_hub');

// Load the .env file to securely use the Huggingface API Key
require('dotenv').config();

// Check if the API key is defined
if (!process.env.HUGGINGFACE_API_KEY) {
  console.error('HUGGINGFACE_API_KEY is undefined. Please check your .env file.');
  process.exit(1);
}

// Create a new Huggingface inference client with your API key
const hfClient = new InferenceClient({ apiKey: process.env.HUGGINGFACE_API_KEY });

// Function to send a message to the Huggingface conversational model and get a response
async function getHuggingfaceResponse(userInput, pastUserInputs = [], generatedResponses = []) {
  try {
    const model = 'facebook/blenderbot-400M-distill'; // Choose a conversational model

    // Send the user input to Huggingface model
    const response = await hfClient.conversational({
      model: model,
      inputs: {
        past_user_inputs: pastUserInputs, // Keep past conversation history here for context
        generated_responses: generatedResponses, // Keep past generated responses here
        text: userInput // User's message
      },
    });
    
    // Return the generated response text
    return response.generated_text;
  } catch (error) {
    console.error('Error getting response from Huggingface API:', error);
    return 'Sorry, I am having trouble understanding your message.';
  }
}

// Example usage of the chatbot function
getHuggingfaceResponse("Tell me about township businesses.")
  .then(response => console.log(response))
  .catch(err => console.error(err));


