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

const {client} = require( '../handlers/index.js');
const {runGPT} = require( "../handlers/gpt-handler.js");
const fs = require("fs");


const init = async (message) => {
    const guildID = message.guildId;
    let config= await JSON.parse(fs.readFileSync(require.resolve('../config.json')))[guildID];
    //console.log(config);
    if (!config.readMode
            || message.member.id!==config.gpt.userID
            || message.channel.id!==config.gpt.channelID
            || message.member.id === client.application.id ) return;
        try {
            const completion = await runGPT(guildID,message.content);
            await message.reply(completion);
        } catch (error) {
            await message.reply("There was an error while speaking to ChatGPT. Please try again later.");
            await console.log(error);
        }
}

module.exports={init}