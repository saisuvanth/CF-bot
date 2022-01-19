const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json');


module.exports = async (client, message) => {
	if (client.user === message.author) return;
	const prefix = config.PREFIX;
	if (!message.content.startsWith(prefix)) return;


	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	let commandFile = client.command.get(command);
	if (commandFile) {
		try {
			commandFile.run(client, message, args);
		} catch (error) { console.log(error) }
	}
}