Feature: Login to an account
	The user should be able to login to an account.

	Scenario: login page
		Given The browser is open on the home page
		When I click on the "login" field
		Then take a screenshot called "login-page" in "login"
		And the first "title" should be "Game Hub | Login"
		And the first "h1" should be "LOGIN"
		And the "h1" number "1" should be "Login"
		And the unordered list in header should be "Home Login Register"

	Scenario: login to an account
		Given The browser is open on the login page
		When I click on the "login" field
		And I enter "Vasper123" in the "username" field
		And I enter "123" in the "password" field
		And I click on the "submit" field
		Then take a screenshot called "logged-in" in "login"
        And the first "title" should be "Game Hub | Welcome to the GameHub"
		And the first "h1" should be "WELCOME TO THE GAMEHUB"
		And the unordered list in header should be "Home Vasper123 Add Logout"
