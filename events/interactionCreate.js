const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`O comando ${interaction.commandName} não existe.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Aconteceu algum erro ao executar o comando.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'Aconteceu algum erro ao executar o comando.', ephemeral: true });
			}
		}
	},
};