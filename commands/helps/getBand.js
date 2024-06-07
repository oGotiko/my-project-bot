const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { apiKey } = require('../../config.json') 

module.exports = {
  data: new SlashCommandBuilder()
    .setName('getbandgothic')
    .setDescription('Pegue uma banda gótica.')
    .addStringOption(option => option
        .setName('nameband')
        .setDescription("Informe o nome da banda.")
    ),

  async execute(interaction) {
    const bandName = interaction.options.getString('nameband'); // Exemplo de banda gótica
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${bandName}&api_key=${apiKey}&format=json`;

    const response = await fetch(url);
    const data = await response.json();
    const artist = data.artist
    
    console.log(data)
    const bio = artist.bio.summary.split('<a')[0].trim();

    

    const embed = new EmbedBuilder()
        .setColor(0x1c1b17)
        .setTitle(`Banda: ${data.artist.name}`)
        .setAuthor({url: null, iconURL: interaction.user.displayAvatarURL(), name: interaction.user.tag})
        .setDescription(bio)
        .setThumbnail(artist.image[1]['#text'])
        .addFields(
            {name: '🎧 Ouvintes:', value: `${artist.stats.listeners}`, inline: true },
            {name: '▶️ Reproduzido:', value: `${artist.stats.playcount}`, inline: true }
        )
        .setImage(artist.image[2]['#text'])

    await interaction.reply({embeds: [embed]})

    

   
}}
