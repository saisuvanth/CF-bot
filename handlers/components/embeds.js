const { MessageEmbed } = require('discord.js');
const { getUser } = require('../api/cfapi.js');

const problemEmbed = async (problem, message) => {
	const embed = new MessageEmbed()
		.setTitle(problem['name'])
		.setDescription(`Rating : ${problem['rating']}`)
		.setColor('#0099ff')
		.addField('Contest Id\tIndex', `${problem.contestId}\t${problem.index}`, false)
		.setThumbnail(`https://camo.githubusercontent.com/f98022613c53f3af924d19b203a429fac6de0f6fc0e6a465e638f89cb83a8e9c/68747470733a2f2f312e62702e626c6f6773706f742e636f6d2f2d54567951646c69726b496f2f576e6468456677725369492f41414141414141414250592f56586273687a6654746c5539694b782d756257724268567a334766724457743667435063424741595943772f73313630302f636f6465666f7263652e706e67`)
		.setFooter(`Requested by: ${message.author.username}`, icon_url = message.author.avatarURL())
		.setURL(`https://codeforces.com/problemset/problem/${problem['contestId']}/${problem['index']}`);
	return embed;
}

const handleSet = async (user, userId, message) => {
	const embed = new MessageEmbed()
		.setThumbnail(user.avatar)
		.setURL(`https://codeforces.com/profile/${user['handle']}`)
		.setDescription(`Handle for <@${userId}> set for [${user.handle}](https://codeforces.com/profile/${user['handle']})`)
		.addField(`Rating:`, `${user.rating ? user.rating : 0} , ${user.rank ? user.rank : 'Unrated'}`, inline = true)
		.setColor('#0099ff')
		.setFooter(`Requested by: ${message.author.username}`, icon_url = message.author.avatarURL());
	return embed;
}

const notRegister = async (message) => {
	const embed = new MessageEmbed()
		.setTitle('User Not Registered')
		.setColor('#0099ff')
		.setDescription('You are not registered in the server.')
		.setFooter(`Requested by: ${message.author.username}`, icon_url = message.author.avatarURL());
	return embed;
}

const problemForCheck = async (problem, message) => {
	const embed = new MessageEmbed()
		.setTitle(problem['name'])
		.setDescription(`Rating : ${problem['rating']}`)
		.setColor('#0099ff')
		.setThumbnail(`https://camo.githubusercontent.com/f98022613c53f3af924d19b203a429fac6de0f6fc0e6a465e638f89cb83a8e9c/68747470733a2f2f312e62702e626c6f6773706f742e636f6d2f2d54567951646c69726b496f2f576e6468456677725369492f41414141414141414250592f56586273687a6654746c5539694b782d756257724268567a334766724457743667435063424741595943772f73313630302f636f6465666f7263652e706e67`)
		.addField(`task:`, `Submit a compilation error in 60sec to this problem`)
		.setFooter(`Requested by: ${message.author.username}`, icon_url = message.author.avatarURL())
		.setURL(`https://codeforces.com/problemset/problem/${problem['contestId']}/${problem['index']}`);
	return embed;
}

const handleEmbed = async (handle, message) => {
	handle = await getUser(handle);
	const embed = new MessageEmbed()
		.setTitle(`${handle.firstName ? handle.firstName : 'no'} ${handle.lastName ? handle.lastName : ' name'}`)
		.setDescription(`Handle : \`${handle.handle}\``)
		.setColor('#0099ff')
		.addField(`Rating:`, `${handle.rating ? handle.rating : 0} , ${handle.rank ? handle.rank : 'Unrated'}`, inline = true)
		.addField(`max Rating :`, `${handle.maxRating ? handle.maxRating : '0'} , ${handle.maxRank ? handle.maxRank : 'Unrated'}`, inline = true)
		.setFooter(`Requested by: ${message.author.username}`, icon_url = message.author.avatarURL())
		.setThumbnail(handle.avatar)
		.setURL(`https://codeforces.com/profile/${handle['handle']}`);
	return embed;
}

const listEmbed = async (list, client, message, flag) => {
	let usernames = '';
	let ratings = '';
	list.forEach((handle, index) => {
		let name = client.users.cache.get(handle.userId).username;
		usernames += `\`${index + 1}\` ${name}\n`;
		ratings += `${handle[flag]}\n`;
	});
	const embed = new MessageEmbed()
		.setTitle(`Handle List for ${message.guild.name}`)
		.setColor('#0099ff')
		.addFields(
			{ name: 'Handles', value: usernames, inline: true },
			{ name: `${flag}`, value: ratings, inline: true }
		)
		.setFooter(`Requested by: ${message.author.username}`, icon_url = message.author.avatarURL())
	return embed;
}



module.exports = { problemEmbed, handleEmbed, listEmbed, problemForCheck, notRegister, handleSet };