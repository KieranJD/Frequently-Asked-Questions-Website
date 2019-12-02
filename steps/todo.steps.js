'use strict'

const { Given, When, Then } = require('cucumber')
const assert = require('assert')
const Page = require('./page.js')
const Question = require('../core/models/question')

let page // this is the page object we use to reference a web page

//setting the page dimensions
const width = 800
const height = 900

//Prevents node.js from thinking the acceptance test has a memeory leak as by deafult listeners are set to 10
require('events').EventEmitter.defaultMaxListeners = 25

Given('The browser is open on the home page', async() => {
	page = await new Page(width, height,'')
})

Given('The browser is open on the {string} page', async(route) => {
	page = await new Page(width, height,`${route}`)
})

When('I login as {string} with password {string}', async(username, password) => {
	//field represents the id attribute in html
	await page.waitForSelector('#login')
	await page.click('#login')
	await page.waitForSelector('#username')
	await page.click('#username')
	await page.keyboard.type(username)
	await page.click('#password')
	await page.keyboard.type(password)
	await page.click('#submit')
})

When('I register as {string} with username {string} and password {string}', async(fullname,username,password) => {
	//field represents the id attribute in html
	await page.waitForSelector('#register')
	await page.click('#register')
	await page.waitForSelector('#name')
	await page.click('#name')
	await page.keyboard.type(fullname)
	await page.click('#username')
	await page.keyboard.type(username)
	await page.click('#password')
	await page.keyboard.type(password)
	await page.click('#submit')
})

When('I create the question title:{string} body:{string}', async(title,body) => {
	//field represents the id attribute in html
	await page.waitForSelector('#add')
	await page.click('#add')
	await page.waitForSelector('#title')
	await page.click('#title')
	await page.keyboard.type(title)
	await page.click('#body')
	await page.keyboard.type(body)
	await page.click('#submit')
})

When('I enter {string} in the {string} field', async(value, field) => {
	//field represents the id attribute in html
	await page.waitForSelector(`#${field}`)
	await page.click(`#${field}`)
	await page.keyboard.type(value)
})

When('I enter image {string} in the {string} field', async(filePath, field) => {
	//field represents the id attribute in html
	await page.waitForSelector(`#${field}`)
	await page.click(`#${field}`)
	const input = await page.$('input[type="file"]')
	await input.uploadFile(filePath)
})

When('I click on the {string} field', async(field) => {
	await page.click(`#${field}`)
})

When('I click on question id {string}', async(id) => {
	await page.click(`#question${id}`)
})

Then('take a screenshot called {string} in {string}', async(filename, folder) => {
	await page.screenshot({ path: `screenshots/${folder}/${filename}.png` })
})

Then('the page should be the home page logged in as {string}', async(username) => {
	const title = await page.evaluate( () => {
		const dom = document.querySelector('title')
		return dom.innerText
	})
	const h1 = await page.evaluate( () => {
		const dom = document.querySelector('h1')
		return dom.innerText
	})
	const ul = await page.evaluate( () => {
		const dom = document.querySelector('ul')
		return dom.innerText
	})
	assert.equal('Game Hub | Welcome to the GameHub', title) //Checks if the html is equal to the parameters
	assert.equal('WELCOME TO THE GAMEHUB', h1)
	assert.equal(`Home  ${username} Add Logout`, ul)
})

//single string argument steps
Then('the {string} number {string} should be {string}', async(element, num, heading) => {
	const text = await page.evaluate( (element, num) => {
		const dom = document.querySelectorAll(element)
		const arr = Array.from(dom).map(h1 => h1.innerText) //Appends all elements to an array
		return arr[num] // returns the desired element in the array
	}, element, num)
	assert.equal(text, heading)
})

//Multiple string argument steps
Then('the {string} number {string} should be', async(element, num, heading) => {
	const question = await new Question(process.env.DB_NAME)
	const date = await question.currentDate(new Date())//Get current date
	const newHeading = heading.replace('{current date}', date)
	const text = await page.evaluate( (element, num) => {
		const dom = document.querySelectorAll(element)
		const arr = Array.from(dom).map(h1 => h1.innerText) //Appends all elements to an array
		return arr[num] // returns the desired element in the array
	}, element, num)
	assert.equal(text, newHeading)
})

Then('the amount of questions shown should be {string}', async(count) => {
	count = Number(count)
	const items = await page.evaluate( () => {
		const dom = document.querySelectorAll('article')
		const arr = Array.from(dom).map(h1 => h1.innerText)
		return arr
	})
	assert.equal(items.length, count)
})

