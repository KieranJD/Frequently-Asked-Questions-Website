
'use strict'

const puppeteer = require('puppeteer')
const wait = 2000


module.exports = class User {

	constructor(width, height,link) {
		return (async() => {
			this.delayMS = 5
			this.browser = await puppeteer.launch(
				{
					headless: true,
					slowMo: this.delayMS,
					args: ['--disable-gpu', '--no-sandbox',	 '--disable-dev-shm-usage']
				})
			this.page = await this.browser.newPage()
			await this.page.setViewport({ width, height })
			await this.page.goto(`http://localhost:8080/${link}`)
			await this.page.evaluate(() => localStorage.clear())
			await this.page.reload()
			return this.page
		})()
	}
}
