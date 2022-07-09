# Discord Bot Boilerplate

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
