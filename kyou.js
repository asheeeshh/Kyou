const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
// const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    client.user.setActivity('ASHISH DEVELOPE ME!', { type: 'WATCHING' });
    client.user.setStatus('online');
	console.log('>> Kyou is awaking...');
	const Guilds = client.guilds.cache.map(guild => guild.id);
    console.log(`>> Servers : ${Guilds.length}`);
	let memcount = 0
	for (g in Guilds) {
		let gui = client.guilds.cache.get(Guilds[g]);
		memcount += gui.memberCount;
	}
	console.log(`>> Members : ${memcount}`);
    console.log('Kyou is Online');
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(process.env.token);