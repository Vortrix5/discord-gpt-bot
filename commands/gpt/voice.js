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
const fs = require("fs");


const description = 'Change the bot\'s voice.';
const options = [
    {
        name: 'voice',
        description: 'The voice you want to change to.',
        type: 3,
        required: true,
        choices: [
            {
                name: 'Emma',
                value: 'Emma',
            },
            {
                name: 'Brian',
                value: 'Brian',
            },
            {
                name: 'Amy',
                value: 'Amy',
            },

            {
                name: 'Justin',
                value: 'Justin',
            },
        ],
    }
]

const run = async (interaction, client) => {
    const voice = interaction.options.getString('voice');
    let config= await JSON.parse(fs.readFileSync(require.resolve('../../config.json')));
    if(config[interaction.guildId].gpt.voice !== voice) {
        config[interaction.guildId].gpt.voice = voice;
        await fs.writeFileSync(require.resolve('../../config.json'), JSON.stringify(config, null, 4));
        await interaction.reply(`The voice has been successfully changed to ${voice}.`);
    }else{
        await interaction.reply(`The voice is already set to ${voice}.`);
    }

}

module.exports={run, description, options};
