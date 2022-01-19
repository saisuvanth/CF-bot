const { getProblem, getProbelmByRating } = require('../../api/cfapi.js');
const { problemEmbed } = require('../../components/embeds.js')

module.exports = {
	name: "gimme",
	description: "Gives you a random or given rating problem.",
	run: async (client, message, args) => {
		if (args.length === 0) {
			let problem = await getProblem();
			message.reply({ embeds: [await problemEmbed(problem, message)] });
		} else {
			try {
				let rat = Math.round(parseInt(args[0]) / 100) * 100;
				let problem = await getProbelmByRating(rat);
				console.log(problem);
				message.reply({ embeds: [await problemEmbed(problem, message)] });
			} catch (e) {
				message.reply("Invalid rating!");
				return;
			}
		}
	}
}