const { findAllUsers } = require('../../../db/dataHandler.js')
const { listEmbed } = require('../../components/embeds.js')

module.exports = {
	name: "listgot",
	description: "List all the gotters",
	run: async (client, message, args) => {
		const guild = message.guild.id;
		const userId = message.author.id;
		try {
			let users = await findAllUsers(guild);
			users = users[0].user;
			let gotters = users.filter(user => user.score > 0);
			gotters = gotters.sort((a, b) => b.score - a.score);
			message.reply({ embeds: [await listEmbed(gotters, client, message, 'score')] });
		} catch (err) {
			message.reply("No got members in server.");
			console.log(err);
		}
	}
}