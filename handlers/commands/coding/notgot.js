const { findUser, updateTimer } = require('../../../db/dataHandler.js');

module.exports = {
	name: "notgot",
	description: "Not got",
	run: async (client, message, args) => {
		const guild = message.guild.id;
		const userId = message.author.id;
		if (args.length === 0) {
			try {
				let user = await findUser(guild, userId);
				if (user.user[0].time === 0) {
					message.reply('WTF when did u even got a question IDIOT');
					return;
				} else {
					message.reply('Dont worry you will improve :smiley:');
					let response = await updateTimer(guild, userId, 0, {});
				}
			} catch (err) {
				message.reply('Something went wrong');
				console.log(err);
			}
		} else {
			message.reply('No arguments are required');
		}
	}
}