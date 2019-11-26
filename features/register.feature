Feature: Register an account
	The user should be able to register an account.

	Scenario: register page
		Given The browser is open on the home page
		When I click on the "register" field
		Then take a screenshot called "regsiter-page"
		And the title should be "Game Hub | Create an account"
		And the heading should be "CREATE AN ACCOUNT"
		And the unordered list in header should be "Home Login Register"
		

	Scenario: create an account
		Given The browser is open on the home page
		When I click on the "register" field
		And I enter "Kieran Dhir" in the "name" field
		And I enter "Vasper123" in the "username" field
		And I enter "123" in the "password" field
		And I click on the "submit" field
		Then take a screenshot called "regsitered"
		And the title should be "Game Hub | Welcome to the GameHub"
		And the heading should be "WELCOME TO THE GAMEHUB"
		And the unordered list in header should be "Home Vasper123 Add Logout"
		
