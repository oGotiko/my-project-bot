const { REST, Routes } = require("discord.js");
const { clientId, guildId, token} = require("./config.json");
const fs = require("fs");
const path = require("path");

const commands = [];

const foldersPath = path.join(__dirname, "commands");
const commandsFolders = fs.readdirSync(foldersPath)

for (const folder of commandsFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.error(`!! AVISO !! - O comando ${filePath} está faltando "data" ou "execute" da propiedade.`)
        }
        
    }
}


const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Iniciando ${commands.length} comandos de barra!`)

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        )

        console.log(`Comandos: ${data.length} (/) recarregados com sucesso.`)
    } catch (error) {

        console.error(error)
    }
})();