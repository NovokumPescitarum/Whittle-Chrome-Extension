const OpenAI = require('openai-api');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);

function callFunction(prompt, input) {
    (async () => {
        const gptResponse = await openai.complete({
            engine: 'davinci',
            prompt: prompt + input,
            maxTokens: 5,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ['\n', "testing"]
        });
        console.log(gptResponse.data.choices[0].text);
    })()
};

