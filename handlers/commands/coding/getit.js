const { findUser, updateTimer } = require('../../../db/dataHandler.js');
const { getProbelmByRating } = require('../../api/cfapi.js')
const { problemEmbed, notRegister } = require('../../components/embeds.js')

const getRat = rating => rating < 800 ? 800 : Math.round(rating / 100) * 100;

module.exports = {
	name: "getit",
	description: "Get it",
	run: async (client, message, args) => {
		const guildId = message.guild.id;
		const userId = message.author.id;
		try {
			let user = await findUser(guildId, userId);
			if (user.user[0].time === 0) {
				if (args.length === 0) {
					let problem = await getProbelmByRating(getRat(parseInt(user.user[0].rating)));
					message.reply({ embeds: [await problemEmbed(problem, message)] });
					let result = await updateTimer(guildId, userId, (Date.now() / 1000) | 0, problem);
				} else if (parseInt(args[0]) % 100 === 0) {
					let rat = parseInt(args[0]);
					let problem = await getProbelmByRating(getRat(parseInt(user.user[0].rating)) + rat);
					message.reply({ embeds: [await problemEmbed(problem, message)] });
					let result = await updateTimer(guildId, userId, (Date.now() / 1000) | 0, problem);
				} else {
					message.reply("Please use a multiple of 100");
				}
			} else {
				message.reply('You have already got a problem,complete it or \`notgot\` it');
			}
		} catch (err) {
			message.reply({ embed: [await notRegister(message)] });
		}
		// if (args.length === 0) {
		// 	try {
		// 		let user = await findUser(guildId, userId);
		// 		if (user.user[0].time === 0) {
		// 			let problem = await getProbelmByRating(user.user[0].rating ? user.user[0].rating + 200 : user.user[0].rating + 800);
		// 			console.log(problem);
		// 			message.reply({ embeds: [await problemEmbed(problem, message)] });
		// 			let result = await updateTimer(guildId, userId, (Date.now() / 1000) | 0, problem);
		// 		} else {
		// 			message.reply('You have already got a problem,complete it or \`notgot\` it');
		// 		}
		// 	} catch (err) {
		// 		message.reply(`You havent registered your handle`);
		// 		console.log(err);
		// 	}
		// } else {
		// 	let rat = parseInt(args[0]);

		// }
	}
}