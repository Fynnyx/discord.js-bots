import { config } from "dotenv";
import { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, ReactionCollector } from "discord.js";
import { readFile } from 'fs/promises'
import axios from "axios";
import { resolve } from "path";
import { rejects } from "assert";

config();

const data = JSON.parse(await readFile(new URL("./properties.json", import.meta.url)))

const client = new Client({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ]
})

// const TOKEN = String(process.env.TOKEN);
const PREFIX = data.prefix
const EMOJI_GUILDID = data.emoji_guild_id

client.on("ready", () => {
    console.info(`\x1b[33m${client.user.username}\x1b[34m, logged in with PREFIX \x1b[33m${PREFIX}\x1b[0m`)
})

// function getData(url) {
//     axios.get(String(url))
//         .then(return response)
// }

function getEmoji(name) {
    const guild = client.guilds.cache.get(EMOJI_GUILDID)
    var emoji = guild.emojis.cache.find(e => e.name === name)
    // console.log("aoushdiausdhpaiuh",emoji);
    return emoji;
}

async function getAgentsEmbed(language, page) {

    axios.get('https://valorant-api.com/v1/agents', {
        params: {
            language: language
        }
    }).then((response) => {
        var max_pages = response.data.data.length - 1
        var agent = response.data.data[page];
        var agent_name_lower = agent.displayName.toLowerCase()

        console.log(agentsEmbed);

        for (var a in agent.abilities) {
            if (agent.abilities[a].slot === "Ability1") {
                var ability1 = agent.abilities[a].description

            } else if (agent.abilities[a].slot === "Ability2") {
                var ability2 = agent.abilities[a].description

            } else if (agent.abilities[a].slot === "Grenade") {
                var grenade = agent.abilities[a].description

            } else if (agent.abilities[a].slot === "Ultimate") {
                var ultimate = agent.abilities[a].description

            }
        }

        var agentsEmbed = new MessageEmbed()
            .setColor("fa4454")
            .setTitle(`- ${agent.displayName} -`)
            .setURL(`https://playvalorant.com/en-us/agents/${agent_name_lower}/`)
            .setDescription(agent.description)
            .setThumbnail(agent.displayIcon)
            .addFields(
                { name: `- ${getEmoji(`${agent.role.displayName.toLowerCase()}`)} -`, value: agent.role.description, inline: false },
                { name: `- ${getEmoji(agent_name_lower + "ability1")} -`, value: ability1, inline: true },
                { name: `- ${getEmoji(agent_name_lower + "ability2")} -`, value: ability2, inline: true },
                { name: `- ${getEmoji(agent_name_lower + "grenade")} -`, value: grenade, inline: true },
            )
        console.log("in function ", agentsEmbed);
    })
    console.log(agentsEmbed)
    return agentsEmbed
}


client.on("messageCreate", async (message) => {
    console.log(message)
    let channel = message.channel
    if (message.content.startsWith(PREFIX)) {
        var content = message.content.replace(PREFIX, "");
        var contentArray = content.split(" ");
        var command = contentArray[0]
        var language = 'en-US'

        console.log(command);

        switch (command) {
            case "agents": {
                console.log("#############################")
                let agentsEmbed = await getAgentsEmbed("en-US", 12)
                console.log("-----------------------------------------------")
                console.log("Test idk what to do ", agentsEmbed);
                channel.send({ embeds: [agentsEmbed] })

                break
            };

            case "agent": {
                console.log(contentArray[1])
                if (contentArray[1] == undefined) {
                    message.channel.send("Please select an agent!")
                } else {


                }
                break
            }
            default: {
                console.log("command not found");
            }
        }
    }
})

client.login(process.env.TOKEN)