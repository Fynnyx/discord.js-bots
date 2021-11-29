import { config } from "dotenv";
import { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, ReactionCollector } from "discord.js";
import { readFile } from 'fs/promises'
import axios from "axios";

config();

const data = JSON.parse(await readFile(new URL("./properties.json", import.meta.url)))

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
})

// const TOKEN = String(process.env.TOKEN);
const PREFIX = data.prefix

client.on("ready", () => {
    console.info(`\x1b[33m${client.user.username}\x1b[34m, logged in with PREFIX \x1b[33m${PREFIX}\x1b[0m`)
})

client.on("messageCreate", async (message) => {
    console.log(message)
    let channel = message.channel
    if (message.content.startsWith(PREFIX)) {
        let content = message.content.replace(PREFIX, "");
        let contentArray = content.split(" ");
        let command = contentArray[0]

        console.log(command);

        switch (command) {
            case "test": {
                channel.send("Test triggered")
                break
            };

            case "test2": {
                channel.send("Test2 TRIGGRED")
                break
            }
            default: {
                console.log("command not found");
                channel.send("Command not found")
            }
        }
    }
})

client.login(process.env.TOKEN)