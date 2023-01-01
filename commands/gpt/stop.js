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

const {clearPrompt} = require("../../handlers/gpt-handler.js");
const {ApplicationCommandOptionType} = require("discord.js");
const {getVoiceConnection} = require("@discordjs/voice");
const fs = require("fs");
const {setReadMode} = require("../../handlers");
const wait = require('node:timers/promises').setTimeout;
const STRING = ApplicationCommandOptionType.String

require('dotenv').config();


const description = 'Stop the text/voice chat.';

const options = [
    {
        name: 'type',
        description: 'The type of chat to stop.',
        required: true,
        type: STRING,
        choices: [
            {
                name: 'Text',
                value: 'text',
            },
            {
                name: 'Voice',
                value: 'voice',
            },
        ],
    }

];

const run = async (interaction, client) => {
    let config= JSON.parse(fs.readFileSync(require.resolve('../../config.json')));
    const guildID = interaction.guildId;
    const type = interaction.options.getString('type');
    await interaction.deferReply();
    if(type === 'text') {
        if (!config[guildID].readMode) {
            await interaction.editReply("AI Chat not running or already stopped.")
        } else if (config[guildID].gpt.channelID !== interaction.channel.id) {
            await interaction.editReply("No AI Chat in this channel. Please run this command in the appropriate channel.")
        } else {
            config[guildID].gpt.channelID = null;
            config[guildID].gpt.userID = null;
            config[guildID].gpt.prompt = '';
            config[guildID].readMode = false;
            await fs.writeFileSync(require.resolve('../../config.json'), JSON.stringify(config, null, 4));
            await interaction.editReply("AI Chat successfully stopped. This channel will be deleted in 5 seconds.");
            await wait(5000);
            await interaction.channel.delete();
        }
    } else if(type === 'voice') {
        const voiceConnection = getVoiceConnection(interaction.guild.id);
        if (!voiceConnection) {
            await interaction.editReply("Voice Chat not running or already stopped.")
        } else {
            await voiceConnection.destroy();
            await interaction.editReply("Voice Chat successfully stopped.");
        }
    }

}

module.exports = {run, description, options};