# Discord Bot Boilerplate

Welcome!
If you've never have made a Discord bot I recommend you to read the [Setup](#setup) section and it will guide you across the Discord's bot creationg process

Otherwise if you have created a Discord bot before and you have it registered on the [Discord Developer's portal page](https://discord.com/developers/applications) and you just want to use the Boilerplate go to [Step 7](#step-7) of the Setup and then go to the [Create new command](#create-new-command) section to learn how the boilerplate works and how to create a new command for your bot

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

Open the <code>config.json</code> file and complete the the blanks with your bot's token

![Step 7](https://i.imgur.com/hg0FBF1.png)

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

## Install Dependencies

```bash
npm install
```

## Run the bot

If you want to run the bot just write on your console

```bash
npm start
```

If you want the bot to watch the changes and reload every time you modify a file write on your console

```bash
npm run dev
```

## Build and create an executable

If you want to create an executable run

```bash
npm run build
```
