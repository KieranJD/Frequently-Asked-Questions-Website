'use strict'

const { Given, When, Then } = require('cucumber')
const assert = require('assert')
const Page = require('./page.js')

let page // this is the page object we use to reference a web page

const width = 800
const height = 900

Given('The browser is open on the home page', async() => {
	page = await new Page(width, height,'')
})

Given('The browser is open on the login page', async() => {
	page = await new Page(width, height,'')
})

Given('The browser is open on the register page', async() => {
	page = await new Page(width, height,'')
})
When('I login as {string} with password {string}', async(username, password) => {
	await page.waitForSelector('#login')
	await page.click('#login') //field represents the id attribute in html
	await page.waitForSelector('#username')
	await page.click('#username')
	await page.keyboard.type(username)
	await page.click('#password')
	await page.keyboard.type(password)
	await page.click('#submit')
})

When('I register as {string} with username {string} and password {string}', async(fullname,username,password) => {
	await page.waitForSelector('#register')
	await page.click('#register') //field represents the id attribute in html
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
	await page.waitForSelector('#add')
	await page.click('#add') //field represents the id attribute in html
	await page.waitForSelector('#title')
	await page.click('#title')
	await page.keyboard.type(title)
	await page.click('#body')
	await page.keyboard.type(body)
	await page.click('#submit')
})

When('I enter {string} in the {string} field', async(value, field) => {
	await page.waitForSelector(`#${field}`)
	await page.click(`#${field}`) //field represents the id attribute in html
	await page.keyboard.type(value)
})

When('I enter image {string} in the {string} field', async(filePath, field) => {
	await page.waitForSelector(`#${field}`)
	await page.click(`#${field}`) //field represents the id attribute in html
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
	assert.equal('Game Hub | Welcome to the GameHub', title)
	assert.equal('WELCOME TO THE GAMEHUB', h1)
	assert.equal(`Home  ${username} Add Logout`, ul)
})

//single argument steps
Then('the {string} number {string} should be {string}', async(element, num, heading) => {
	const text = await page.evaluate( (element, num) => {
		const dom = document.querySelectorAll(element)
		const arr = Array.from(dom).map(h1 => h1.innerText)
		return arr[num]
	}, element, num)
	assert.equal(text, heading)
})

//Multiple argument steps
Then('the {string} number {string} should be', async(element, num, heading) => {
	const text = await page.evaluate( (element, num) => {
		const dom = document.querySelectorAll(element)
		const arr = Array.from(dom).map(h1 => h1.innerText)
		return arr[num]
	}, element, num)
	assert.equal(text, heading)
})

Then('the unordered list in header should be {string}', async heading => {
	const text = await page.evaluate( () => {
		const dom = document.querySelector('ul')
		return dom.innerText
	})
	assert.equal(heading, text)
})

/*Then('count elements', async(element, num, heading) => {
	const items = await page.evaluate( (element, num) => {
		const dom = document.querySelectorAll(`${element}:nth-child(${num})`)
		const arr = Array.from(dom).map(h1 => h1.innerText)
		return arr
	}, element, num)
	assert.equal(items, heading)
})*/

