const DiscordJS = require('discord.js')
const NUMBER = DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER

const description = 'Sum two numbers'

const options = [
    {
        name: 'number1',
        description: 'First Number',
        required: true,
        type: NUMBER,
    },
    {
        name: 'number2',
        description: 'Second Number',
        required: true,
        type: NUMBER,
    },
]

const init = (interaction, client) => {
    const sum =
        interaction.options.getNumber('number1') +
        interaction.options.getNumber('number2')

    interaction.reply('The sum is: ' + sum)
}

module.exports = { init, description, options }
