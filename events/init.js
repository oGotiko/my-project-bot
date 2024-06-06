const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    async execute(bot) {
        console.log('Iniciado como: ', bot.user.tag)
    }
}