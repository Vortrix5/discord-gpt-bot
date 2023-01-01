# 🤖 Discord AI Bot

[![Node.js](https://img.shields.io/badge/Node.js-14.x-green?style=flat-square)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-6.x-red?style=flat-square)](https://www.npmjs.com/)
[![Discord.js](https://img.shields.io/badge/Discord.js-14.x-blue?style=flat-square)](https://discord.js.org/)
[![OpenAI API](https://img.shields.io/badge/OpenAI%20API-v2-yellow?style=flat-square)](https://beta.openai.com/docs/api-overview/getting-started)
[![wit.ai API](https://img.shields.io/badge/wit.ai%20API-v2.x-brightgreen?style=flat-square)](https://wit.ai/)
[![GitHub license](https://img.shields.io/github/license/Vortrix5/discord-ai-bot?style=flat-square)](https://github.com/Vortrix/discord-ai-bot/blob/master/LICENSE)

A Discord bot that allows users to communicate with an AI using the OpenAI API.

## 🚀 Features

- `/start [text/voice]`: Creates a text/voice channel to start a conversation with the bot
- `/stop [text/voice]`: Destroys the connection with the bot
- `/clear`: Clears the conversation prompt
- `/ask`: Asks one question to the bot, no conversation

## 💾 Installation

1. Clone the repository: `git clone https://github.com/vortrix5/discord-ai-bot.git`
2. Navigate to the project directory: `cd discord-ai-bot`
3. Install the dependencies: `npm install`
4. Create a file named `.env` based on the example provided: `cp .env.example .env`
5. Edit the `.env` file and fill in the details:

```
TOKEN=<your discord bot token>
OPENAI_API_KEY=<your openai API key>
WITAI_API_KEY=<your wit.ai API key>
```

## 🔑 Getting a Discord Bot Token

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and log in.
2. Click the "New Application" button.
3. Give your application a name and click "Create".
4. Click on the "Bot" tab on the left side of the screen.
5. Click the "Add Bot" button.
6. Click the "Copy" button next to the "Token" field to copy the token to your clipboard.

## 🔑 Getting an OpenAI API Key

1. Go to the [OpenAI API documentation](https://beta.openai.com/docs/api-overview/getting-started) and click the "Sign up for an API key" button.
2. Follow the instructions to sign up for an API key.

## 🔑 Getting a wit.ai API Key

1. Go to the [wit.ai website](https://wit.ai/) and click the "Sign up" button.
2. Follow the instructions to sign up for an API key.

## 🤖 Usage

1. Run the bot: `npm start`
2. Invite the bot to your Discord server by following these steps:

- Go to the [Discord Developer Portal](https://discord.com/developers/applications) and log in.
- Click on the application that represents your bot.
- Click on the "**OAuth2**" tab on the left side of the screen.
- Under the "**Scopes**" section, check the boxes for "**bot**" and "**application.commands**".
- Under the "Permissions" section, check the box for "**Administrator**".
- Click the "Copy" button next to the generated link to copy the invite link to your clipboard.
- Open the invite link in your browser to add the bot to your Discord server.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
