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

const {loadCommands} = require('../../events/ready.js');
const description = 'Reloads all commands.';

const run = async (message, client) => {
    await message.reply({content: "Reloading all commands...", ephemeral: true});
    try {
        await loadCommands(client);
    }catch (error) {
        await message.editReply({content: `There was a problem while running this message.`, ephemeral: true});
        await console.log(error);
    }
    await message.editReply({content: `All commands have been reloaded!`, ephemeral: true});
}

const developer = true; // This is a developer command. Only the developer can use it.

module.exports= {run, description, developer};