import { config } from "dotenv";
import { Client, Intents } from "discord.js";
import { readFile } from 'fs/promises'
import { isCommand } from './src/commandHandler.js'

config();

const data = JSON.parse(await readFile(new URL("./properties.json", import.meta.url)))

const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]})

// const TOKEN = String(process.env.TOKEN);
const PREFIX = data.prefix

client.on("ready", () => { 
    console.info(`\x1b[33m${client.user.username}\x1b[34m, logged in with PREFIX \x1b[33m${PREFIX}\x1b[0m`)
})

client.on("messageCreate", (message) => {
    // console.log(message)
    let channel = message.channel
    if (message.content.startsWith(PREFIX)) {
        let content = message.content.replace(PREFIX, "");
        let contentArray = content.split(" ");
        let command = contentArray[0]
        console.log(isCommand("test"))
    }
})
client.login(process.env.TOKEN)