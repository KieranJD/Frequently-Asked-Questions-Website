Feature: Logout an account
	The user should be able to logout an account.

	Scenario: logout an account
		Given The browser is open on the home page
        When I click on the "login" field
		And I enter "Vasper123" in the "username" field
		And I enter "123" in the "password" field
		And I click on the "submit" field
		And I click on the "logout" field	
		Then take a screenshot called "logged-out" in "logout"
        And the first "title" should be "Game Hub | Welcome to the GameHub"
		And the first "h1" should be "WELCOME TO THE GAMEHUB"
		And the unordered list in header should be "Home Login Register"
	