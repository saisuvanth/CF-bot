const { INTENTS, TOKEN } = require('./config.json');
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: INTENTS });

client.command = new Collection();

client.once('ready', () => {
	console.log(`Logged in as ${client.user.username}`);
});

['commands', 'events'].forEach(x => { require(`./handlers/${x}`)(client) });


client.login(TOKEN)
	// .then(client.user.setActivity('Playing with your life'));

