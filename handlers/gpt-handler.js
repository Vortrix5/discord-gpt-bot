/*
 * MIT License
 *
 * Copyright (c) 2022 Amine Zouaoui
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const {Configuration, OpenAIApi} = require("openai");
const fs = require("fs");

require('dotenv').config();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

let guildID;

async function runGPT(guild,input) {
    let config= JSON.parse(fs.readFileSync(require.resolve('../config.json')));
    guildID = guild;

    let prompt = config[guild].gpt.prompt;
    const humanIndex = prompt.indexOf("Human: ");

    const aiIndex = prompt.indexOf("AI: ", humanIndex) + 3;   // Find the indexes of the next human and AI messages in the prompt

    const nextMessageIndex = prompt.indexOf("Human: ", aiIndex + 1);

    prompt = prompt.substring(0, humanIndex) + prompt.substring(nextMessageIndex, prompt.length);  // Remove the oldest messages from the prompt until it is under the maximum length, it will not remove the top description in the prompt
    prompt += `${input}\n`;  //Add the received message to the prompt
    const gptResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 256,
        temperature: 0.5,
        top_p: 0.4,
        presence_penalty: 0.7,
        frequency_penalty: 0.7,
        stop: [" Human:", " AI:"],
    });
    prompt += `${gptResponse.data.choices[0].text.substring(0)}\n`;
    prompt += `Human: `;  // add Human: to let the AI better understand that this is a message sent by human
    config[guildID].gpt.prompt = prompt;
    fs.writeFileSync(require.resolve('../config.json'), JSON.stringify(config, null, 4));
    return `${gptResponse.data.choices[0].text}`;  // add the response to the prompt, which will automatically start with AI:

}


module.exports={runGPT}