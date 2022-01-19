const { tags } = require('./tags.js');
const axios = require('axios');

//function for random number
const randomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};


//function for random element in array
const randomElement = (array) => {
	return array[Math.floor(Math.random() * array.length)];
}


const getRating = async (username) => {
	let url = `https://codeforces.com/api/user.info?handles=${username}`;
	let response = await axios.get(url);
	if (response.data.status === 'OK') {
		try {
			return response.data.result[0].rating;
		} catch (e) {
			return false;
		}
	} else {
		return false;
	}
}

const getProblem = async () => {
	let url = `https://codeforces.com/api/problemset.problems?${tags}`;
	let response = await axios.get(url);
	if (response.data.status === 'OK') {
		try {
			let problems = response.data.result.problems;
			let problem = randomElement(problems);
			return problem;
		} catch (e) {
			return false;
		}
	}
}

const getProbelmByRating = async (rating) => {
	let url = `https://codeforces.com/api/problemset.problems?${tags.join(';')}`;
	let response = await axios.get(url);
	if (response.data.status === 'OK') {
		try {
			let problems = response.data.result.problems;
			problems = problems.filter(problem => problem.rating == rating);
			let problem = randomElement(problems);
			return problem;
		} catch (e) {
			return false;
		}
	}
}


const handleCheck = async (handle, problem, flag) => {
	const url = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=3`;
	const response = await axios.get(url);
	if (response.data.status === 'OK') {
		let result = response.data.result;
		for (let i = 0; i < result.length; i++) {
			if ((result[i].problem.contestId === problem.contestId && result[i].problem.index === problem.index) && result[i].verdict === flag) {
				return true;
			}
		}
		return false;
	} else {
		return false;
	}
}

const getUser = async (handle) => {
	const url = `https://codeforces.com/api/user.info?handles=${handle}`;
	const response = await axios.get(url);
	if (response.data.status === 'OK') {
		try {
			return response.data.result[0];
		} catch (e) {
			return false;
		}
	} else {
		return false;
	}
}
module.exports = { getRating, getProblem, handleCheck, getUser, getProbelmByRating };

