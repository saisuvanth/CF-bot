const { MongoClient, FindCursor } = require('mongodb');
const config = require('../config.json');

const client = new MongoClient(config['DB KEY']);


const findUser = async (guildId, userId) => {
	try {
		await client.connect();
		const collection = await client.db('myData').collection('users');
		const query = {
			guildId: guildId,
			'user.userId': userId
		}
		const options = {
			projection: { _id: 0, guildId: 1, user: 1 }
		}
		const result = await collection.findOne(query, options);
		return result;
	} catch (err) {
		console.error(err);
		return false
	} finally {
		await client.close();
	}
}

const findAllUsers = async (guildId) => {
	try {
		await client.connect();
		const collection = await client.db('myData').collection('users');
		const query = {
			guildId: guildId
		}
		const options = {
			projection: { _id: 0, guildId: 1, user: 1 }
		}
		const result = await collection.find(query, options).toArray();
		return result;
	} catch (err) {
		console.error(err);
		return false
	} finally {
		await client.close();
	}
}

const insertUser = async (guildId, userId) => {
	try {
		await client.connect();
		const collection = await client.db('myData').collection('users');
		const result = await collection.updateOne({ guildId: guildId, }, { $push: { user: userId } }, { upsert: true });
		console.log('Inserted');
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
}

const updateTimer = async (guildId, userId, time, problem) => {
	try {
		await client.connect();
		const collection = await client.db('myData').collection('users');
		const result = await collection.updateOne({ guildId: guildId, 'user.userId': userId }, { $set: { 'user.$.time': time, 'user.$.problem': problem } });
		console.log('Updated');
		return result;
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
}

const updateTimerwithScore = async (guildId, userId, time, problem, score) => {
	try {
		await client.connect();
		const collection = await client.db('myData').collection('users');
		const result = await collection.updateOne({ guildId: guildId, 'user.userId': userId }, { $set: { 'user.$.time': time, 'user.$.problem': problem, 'user.$.score': score } });
		console.log('Updated');
		return result;
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
}

module.exports = { insertUser, findUser, findAllUsers, updateTimer, updateTimerwithScore };

// findAll('839507389786619934').then(result => console.log(result[0]));


