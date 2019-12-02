'use strict'

async function addStars(data, bronzeQuestionArray, silverQuestionArray, goldQuestionArray) {
	data.forEach(entry => {
		if(bronzeQuestionArray.includes(entry.id)) {
			entry.bronze = 'true'
		}
		if(silverQuestionArray.includes(entry.id)) {
			entry.silver = 'true'
		}
		if(goldQuestionArray.includes(entry.id)) {
			entry.gold = 'true'
		}
	})
	return data
}

async function bronzeQuestions(star, data) {
	const starArray = []
	const bronzeQuestionArray = []
	for(let i=0; i < star.bronze.length; i++) {
		starArray.push(star.bronze[i].name)
	}
	for(let x=0; x < starArray.length; x++) {
		for(let i=0; i < data.length; i++) {
			if (starArray[x] === data[i].user_name) bronzeQuestionArray.push(data[i].id)
		}
	}
	return bronzeQuestionArray
}

async function silverQuestions(star, data) {
	const starArray = []
	const silverQuestionArray = []
	for(let i=0; i < star.silver.length; i++) {
		starArray.push(star.silver[i].name)
	}
	for(let x=0; x < starArray.length; x++) {
		for(let i=0; i < data.length; i++) {
			if (starArray[x] === data[i].user_name) silverQuestionArray.push(data[i].id)
		}
	}
	return silverQuestionArray
}

async function goldQuestions(star, data) {
	const starArray = []
	const goldQuestionArray = []
	for(let i=0; i < star.gold.length; i++) {
		starArray.push(star.gold[i].name)
	}
	for(let x=0; x < starArray.length; x++) {
		for(let i=0; i < data.length; i++) {
			if (starArray[x] === data[i].user_name) goldQuestionArray.push(data[i].id)
		}
	}
	return goldQuestionArray
};

async function questionStar(bronzeQuestionArray, silverQuestionArray, goldQuestionArray) {
	bronzeQuestionArray = bronzeQuestionArray.filter( ( del ) => !silverQuestionArray.includes( del ))
	silverQuestionArray = silverQuestionArray.filter( ( del ) => !goldQuestionArray.includes( del ))
	return {bronzeQuestionArray, silverQuestionArray, goldQuestionArray}
}
module.exports.addStars = addStars
module.exports.bronzeQuestions = bronzeQuestions
module.exports.silverQuestions = silverQuestions
module.exports.goldQuestions = goldQuestions
module.exports.questionStar = questionStar

