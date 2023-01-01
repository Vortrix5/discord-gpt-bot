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

const {client} = require('../handlers/index.js');
require('dotenv').config();


const init = async (interaction) => {
    //Command Listener
    if (interaction.isCommand()) {
        const {commandName} = interaction;
        const selectedCommand = client.commands.get(commandName);
        if (selectedCommand.developer && interaction.user.id !== process.env.DEVELOPER_ID) {
            return interaction.reply({content: "This command is only available to the developer.", ephemeral: true});
        } else {
            try {
                await selectedCommand.run(interaction, client);
            } catch (error) {
                interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
                console.error(`Error executing ${commandName}`);
                console.error(error);
            }
        }
    }

    //Button Listener
    else if (interaction.isButton()) {
        if (interaction.customId === 'primary') {
            await interaction.update({content: 'A primary button was clicked!', components: []});
        } else {
            await interaction.update({content: 'Another button was clicked!', components: []});
        }
    }
    //Modal Listener
    else if (interaction.isModalSubmit()) {
        if (interaction.customId === 'myModal') {
            await interaction.reply({content: 'Your submission was received successfully!'});
        }
    }
    //Context Menu
    else if (interaction.isUserContextMenuCommand()) {
        console.log(interaction);
    }
}

module.exports = {init};
