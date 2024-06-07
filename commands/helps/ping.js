const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Retorna o ping do usúario"),
    async execute(interaction) {
        await interaction.reply("Ping: ", interaction.ws.ping);
    }
}

