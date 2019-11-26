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

Given('The browser is open on the register page', async() => {
	page = await new Page(width, height,'register')
})

When('I enter {string} in the {string} field', async(value, field) => {
	await page.waitForSelector(`#${field}`)
	await page.click(`#${field}`) //field represents the id attribute in html
	await page.keyboard.type(value)
})

When('I click on the {string} field', async(field) => {
	await page.click(`#${field}`)
})

When('I click on the delete link', async() => {
	await page.click('#delete')
})

Then('take a screenshot called {string}', async filename => {
	await page.screenshot({ path: `screenshots/${filename}.png` })
})

Then('the heading should be {string}', async heading => {
	page.waitForSelector('h1')
	const text = await page.evaluate( () => {
		const dom = document.querySelector('h1')
		return dom.innerText
	})
	assert.equal(heading, text)
})

Then('the title should be {string}', async heading => {
	page.waitForSelector('title')
	const text = await page.evaluate( () => {
		const dom = document.querySelector('title')
		return dom.innerText
	})
	assert.equal(heading, text)
})

Then('the unordered list in header should be {string}', async heading => {
	page.waitForSelector('ul')
	const text = await page.evaluate( () => {
		const dom = document.querySelector('ul')
		return dom.innerText
	})
	assert.equal(heading, text)
})

