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

const {ApplicationCommandOptionType, ActivityType} = require("discord.js");
const description = 'Sets the bot\'s status.';
const STRING = ApplicationCommandOptionType.String

const options = [
    {
        name: 'status',
        description: 'The status to set.',
        required: true,
        type: STRING,
        choices: [
            {
                name: 'Online',
                value: 'online',
            },
            {
                name: 'Idle',
                value: 'idle',
            },
            {
                name: 'Do Not Disturb',
                value: 'dnd',
            },
            {
                name: 'Invisible',
                value: 'invisible',
            },
        ],
    },
    {
        name: 'activity',
        description: 'The activity to set.',
        required: false,
        type: STRING,
        choices: [
            {
                name: 'Playing',
                value: 'playing',
            },
            {
                name: 'Streaming',
                value: 'streaming',
            },
            {
                name: 'Listening to',
                value: 'listening',
            },
            {
                name: 'Watching',
                value: 'watching',
            },
        ],
    },
    {
        name: 'name',
        description: 'The name of the activity.',
        required: false,
        type: STRING,
    },
    {
        name: 'url',
        description: 'The url of the activity.',
        required: false,
        type: STRING,
    },
];

const run = async (message, client) => {
    const status = message.options.getString('status');
    const activity = message.options.getString('activity');
    const name = message.options.getString('name') || '';
    const url = message.options.getString('url');
    const activities = {
        playing: ActivityType.Playing,
        streaming: ActivityType.Streaming,
        listening: ActivityType.Listening,
        watching: ActivityType.Watching,
    };
    const activityType = activities[activity]; // This is the activity type.

    await client.user.setPresence({
        activities: [{
            name: name,
            type: activityType,
            url: url
        }],
        status: status,
    });

    message.reply({content: 'Status set.', ephemeral: true});

}

const developer = true; // This is a developer command. Only the developer can use it.

module.exports= {run, description, developer, options};