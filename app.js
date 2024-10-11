const { HfInference } = require('@huggingface/inference');

// Replace 'your_huggingface_access_token' with your actual Hugging Face access token
const hf = new HfInference('your_huggingface_access_token');

(async () => {
  try {
    const result = await hf.textGeneration({
      model: 'gpt2',  // You can replace 'gpt2' with other available models
      inputs: 'The future of AI is',
    });

    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
