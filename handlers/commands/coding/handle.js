const { getProblem, handleCheck, getUser } = require('../../api/cfapi.js')
const { findUser, insertUser, findAllUsers } = require('../../../db/dataHandler.js')
const { notRegister, handleEmbed, listEmbed, problemForCheck, handleSet } = require('../../components/embeds.js')
const { ADMINS } = require('../../../config.json');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {
	name: "handle",
	description: "stores users handles",
	run: async (client, message, args) => {
		const author = message.author.id;
		const guildId = message.guild.id;
		if (args[0] === 'register') {
			const id = args[1].trim();
			try {
				let user = await getUser(id);
				let p = await findUser(guildId, author);
				if (!user) {
					message.reply('No handle Exists');
				}
				if (p) {
					message.reply('You already have a handle stored.Request moderator to change it.');
				} else {
					let problem = await getProblem();
					message.reply({ embeds: [await problemForCheck(problem, message)] });
					await sleep(60000);
					let check = await handleCheck(id, problem, 'COMPILATION_ERROR');
					if (check) {
						message.channel.send({ embeds: [await handleSet(user, author, message)] });
						insertUser(guildId, { userId: author, handle: id, rating: user.rating ? user.rating : 0, score: 0, timer: 0, problem: {}, duel: 0 });
					} else {
						message.channel.send(`<@!${message.author.id}> You did not submit a compilation error in 60sec`);
					}
				}
			} catch (err) {
				await message.reply('No handle exists');
			}
		} else if (args[0] === 'set') {
			if (ADMINS.includes(author) || message.member.hasPermission('ADMINISTRATOR')) {
				try {
					const id = args[1].slice(3, -1);
					const handle = args[2].trim();
					let user = await getUser(handle);
					if (!user) {
						message.reply('No handle Exists');
						return;
					}
					message.reply({ embeds: [await handleSet(user, id, message)] });
					insertUser(guildId, { userId: id, handle: handle, rating: user.rating ? user.rating : 0, score: 0, timer: 0, problem: {}, duel: 0 });
				} catch (err) {
					message.reply('No handle exists');
				}
			} else {
				message.reply('You do not have permission to use this command');
			}
		} else if (args[0] === 'get') {
			try {
				if (args[1]) {
					try {
						const id = args[1].slice(3, -1);
						let p = await findUser(guildId, id);
						message.reply({ embeds: [await handleEmbed(p.user[0].handle, message)] });
					} catch (err) {
						message.reply({ embeds: [await notRegister(message)] });
					}
				}
			} catch (err) {
				message.reply('Mention a user you fool');
			}
		} else if (args[0] === 'list') {
			const users = (await findAllUsers(guildId));
			message.reply({ embeds: [await listEmbed(users[0].user, client, message, 'rating')] });
		} else if (args[0] === 'remove') {

		}
	}
}