# Discord Bot Boilerplate

Welcome!
If you've never have made a Discord bot I recommend you to read the [Setup](#setup) section and it will guide you across the Discord's bot creationg process

Otherwise if you have created a Discord bot before and you have it registered on the [Discord Developer's portal page](https://discord.com/developers/applications) and you just want to use the Boilerplate go to [Step 9](#step-9) of the Setup and then go to the [Create new command](#create-new-command) section to learn how the boilerplate works and how to create a new command for your bot

## Setup

### Step 1

In order to make our discord bot, first we have to create our application on the [Discord Developer's portal page](https://discord.com/developers/applications), go to the page, login with your Discord account and press the **"New Application"** button.

![Step 1](https://i.imgur.com/53VFai6.png)

### Step 2

Then it will show you a popup where you will write your project's name and click the **"Create"** button

![Step 2](https://i.imgur.com/KVYgMI5.png)

> _If you don't know what name to write, simply write your bot's name_

### Step 3

Go to the **"Bot"** page

![Step 3](https://i.imgur.com/HtaKQXF.png)

### Step 4

Click the **"Add Bot"** button

![Step 4](https://i.imgur.com/YwSN1ik.png)

### Step 5

Change the **"Username"** field to the name you want your Discord bot to have and click on the **"Reset Token"** button

![Step 5](https://i.imgur.com/x3iTTFv.png)

### Step 6

Copy the token

![Step 6](https://i.imgur.com/dtMbKem.png)

### Step 7

In order to invite the bot to your Discord Channel you'll have to go to the URL Generator and check <code>application.commands</code> , <code>bot</code> and <code>Administrator</code> options so the bot can work well.

**IMPORTANT:** If you don't check the <code>application.commands</code> option the bot won't work.

![Step 7](https://i.imgur.com/rKnu1ky.png)

### Step 8

This will generate a link at the bottom of the page that you can copy to add the bot to your server.

![Step 8](https://i.imgur.com/OJfIUjI.png)

### Step 9

Create a <code>.env</code> file _(you can use the example.env as a template)_ and complete the the blanks with your bot's tokens

![Step 9](https://i.imgur.com/VqIAjcs.png)

> _You can use the same token in both variables_

## Create new command

In order to create a new command you have to create a new .js file in the "commands" folder with the name of the command you want to create. This file should have the following structure

```js
const description = "Command's description"

// The main function
const init = (interaction, client) => {
    // ...
}

module.exports = { init, description }
```

## Create new command with params

If you want to create a command with params you'll have to create a new .js file in the "commands" folder with the name of the command and the file should have the following structure

```js
const DiscordJS = require('discord.js')
const description = 'Show Message'

/* 
There are some param types you can use, see the DiscordJS docs in order to know which one to use.
https://discordjs.guide/interactions/slash-commands.html#option-types 
*/
const PARAM_TYPE = DiscordJS.Constants.ApplicationCommandOptionTypes.STRING

// Here you have to create an object for each param you want to create
const options = [
    {
        name: 'param_name', // Name of the param
        description: 'Text to Show', // Description of the param
        required: true, // Check if the param is obligatory
        type: PARAM_TYPE, // The type of param
    },
]

const init = (interaction, client) => {
    /*
    Instread of "getString" you might use other method, it depends on the type of param you are using, 
    see the DiscordJS documentation in order to know which one to use.
    https://discordjs.guide/interactions/slash-commands.html#parsing-options
    */
    const text = interaction.options.getString('param_name')

    interaction.reply('The text is: ' + text)
}

module.exports = { init, description, options }
```

## Install Dependencies

```bash
npm install
```

## Run the bot

If you want to run the bot for production just write on your console

```bash
npm start
```

If you want to run the bot for development write on your console

```bash
npm run dev
```

If you want the bot to watch the changes and reload every time you modify a file write on your console

```bash
npm run dev:watch
```

## Build and create an executable

If you want to create an executable run

```bash
npm run build
```

## Diferences between TOKEN_PROD and TOKEN_DEV

The <code>TOKEN_DEV</code> variable is used when you execute the <code>npm run dev</code> and <code>npm run dev:watch</code> commands on your console. The <code>TOKEN_PROD</code> is used when you use <code>npm start</code> and <code>npm run build</code>.

> NOTE: You can put the same token on both variables.
