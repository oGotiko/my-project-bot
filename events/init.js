const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    async execute(bot) {
        console.log('Iniciado: ', bot.user.tag)
    }
}