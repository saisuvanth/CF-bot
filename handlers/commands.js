const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = client => {
	const loadCommands = dir => {
		const commands = readdirSync(join(__dirname, `./commands/${dir}/`)).filter(file => file.endsWith('.js'));
		for (const file of commands) {
			const command = require(`./commands/${dir}/${file}`);
			client.command.set(command.name, command);
		}
	}
	['coding', 'fun'].forEach(dir => loadCommands(dir));
	console.log(`Loaded ${client.command.size} commands.`);
}