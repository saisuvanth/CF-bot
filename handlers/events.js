const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = client => {
	const loadEvents = dir => {
		const events = readdirSync(join(__dirname, `./events/${dir}/`)).filter(file => file.endsWith('.js'));
		for (let file of events) {
			const event = require(`./events/${dir}/${file}`);
			const eName = file.split('.')[0];
			client.on(eName, event.bind(null, client));
		}
	}
	['guild', 'message'].forEach(dir => loadEvents(dir));
}