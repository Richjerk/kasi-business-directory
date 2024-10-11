const { HfInference } = require('@huggingface/inference');

const hf = new HfInference('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');

(async () => {
  const result = await hf.textGeneration({
    model: 'gpt2',
    inputs: 'The future of AI is',
  });

  console.log(result);
})();
