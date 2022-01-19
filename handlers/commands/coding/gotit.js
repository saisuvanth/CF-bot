const { findUser, updateTimerwithScore } = require('../../../db/dataHandler.js');
const { handleCheck } = require('../../api/cfapi.js');

const scorer = (score, time, threshold) => {
	const scoreMultiplier = ((Date.now() / 1000) | 0) - time;
	return score + ((7200 / scoreMultiplier) | 0) * threshold;
}

module.exports = {
	name: "gotit",
	description: "Got it!",
	run: async (client, message, args) => {
		const guild = message.guild.id;
		const userId = message.author.id;
		if (args.length === 0) {
			try {
				let user = await findUser(guild, userId);
				if (await handleCheck(user.user[0].handle, user.user[0].problem, 'OK')) {
					message.reply(`Whoaa you got it :partying_face:`);
					let score = scorer(user.user[0].score, user.user[0].time, problem.rating - user.user[0].rating);
					await updateTimerwithScore(guildId, userId, 0, {}, score);
				} else {
					message.reply(`You cant cheat me :unamused: :face_with_monocle:`);
				}
			} catch (err) {
				message.reply(`You didnt register`);
				console.log(err);
			}
		}
	}
}