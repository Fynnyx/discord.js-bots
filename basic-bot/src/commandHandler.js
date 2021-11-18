import { readFile } from "fs/promises"
// If is registered command
export async function isCommand(command) {
    // console.log(command);
    let commands = JSON.parse(await readFile("./commands.json"));
    console.log(commands);
    for (let x in commands) {
        if (x == command) {
            return "true";
        }
    }
}

// export isCommand()