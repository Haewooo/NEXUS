// backend/services/aiService.js 
require('dotenv').config();
const axios = require('axios');

const contributionScoring = async ({ dataset, model }) => {
  try {
    const prompt = `You are an AI evaluator. Based on the following details:
    - Dataset: ${dataset}
    - Model: ${model}
    Please provide a quality score between 0 and 100. Give only the score as a response.`;

    // Make a request to the OpenAI API for evaluation
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003', 
        prompt: prompt,
        max_tokens: 10,             
        temperature: 0.5,           
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data.choices[0].text.trim();
    const score = parseFloat(result);

    // Check if the response is a valid number between 0 and 100
    if (isNaN(score) || score < 0 || score > 100) {
      throw new Error(`AI returned an invalid score: ${result}`);
    }

    return score;  // Return the valid score

  } catch (error) {
    console.error('Error in AI contribution scoring:', error.message);
    throw new Error('Failed to retrieve a valid score from the AI service.');
  }
};

module.exports = { contributionScoring };