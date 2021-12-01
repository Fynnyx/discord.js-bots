import { config } from "dotenv";
import { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, ReactionCollector, GuildMember } from "discord.js";
import { readFile, writeFile } from 'fs/promises'
import axios from "axios";
import { write } from "fs";

config();

const data = JSON.parse(await readFile(new URL("./properties.json", import.meta.url)))

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
})

async function isOwner(member, guild) {
    if (guild.ownerId != member.id) {
        return false
    }
    return true
}

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
        let command = contentArray[0].toLowerCase()

        console.log(command);

        switch (command) {
            case "help": {
                channel.send("Help triggered")
                break
            };

            case "sc":
            case "setchannel":
            case "set": {
                if (await isOwner(message.author, message.guild) === true) {
                    channel.send('Verify Channel `set` to ' + `${message.channel}`)
                } else {
                    channel.send("You must be the Owner of the Server to set the Channel.")
                }
                break
            }
            default: {
                console.log("command not found");
                channel.send("Command not found")
            }
        }
    }
})

client.on("guildCreate", async (guild) => {
    let guilds = JSON.parse(await readFile(new URL("./guilds.json", import.meta.url)))
    let guildid = guild.id
    guilds.guildid
    await writeFile("./guilds.json", guilds)
})

client.login(process.env.TOKEN)