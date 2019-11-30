Feature: Login to an account
	The user should be able to login to an account.

	Scenario: login page
		Given The browser is open on the home page
		When I click on the "login" field
		Then take a screenshot called "login-page" in "login"
		And the "title" number "0" should be "Game Hub | Login"
		And the "h1" number "0" should be "LOGIN"
		And the "h1" number "1" should be "Login"
		And the "ul" number "0" should be "Home Login Register"

	Scenario: login to an account
		Given The browser is open on the home page
		When I login as "Vasper123" with password "123"
		Then take a screenshot called "logged-in" in "login"
        And the page should be the home page logged in as "Vasper123"

		Scenario: login to another account
		Given The browser is open on the home page
		When I login as "Gamer123" with password "1234"
		Then take a screenshot called "logged-in-another" in "login"
        And the page should be the home page logged in as "Gamer123"
