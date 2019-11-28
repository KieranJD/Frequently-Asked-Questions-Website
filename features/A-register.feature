Feature: Register an account
	The user should be able to register an account.

	Scenario: register page
		Given The browser is open on the home page
		When I click on the "register" field
		Then take a screenshot called "regsiter-page" in "register"
		And the first "title" should be "Game Hub | Create an account"
		And the first "h1" should be "CREATE AN ACCOUNT"
		And the "h1" number "1" should be "Sign Up"
		And the unordered list in header should be "Home Login Register"
		
	Scenario: create an account
		Given The browser is open on the register page
		And I enter "Sam Smith" in the "name" field
		And I enter "Vasper123" in the "username" field
		And I enter "123" in the "password" field
		And I click on the "submit" field
		Then take a screenshot called "regsitered" in "register"
		And the first "title" should be "Game Hub | Welcome to the GameHub"
		And the first "h1" should be "WELCOME TO THE GAMEHUB"
		And the unordered list in header should be "Home Vasper123 Add Logout"
	
	Scenario: create another account
		Given The browser is open on the register page
		And I enter "Emma Jones" in the "name" field
		And I enter "Gamer123" in the "username" field
		And I enter "1234" in the "password" field
		And I click on the "submit" field
		Then take a screenshot called "regsitered-another" in "register"
		And the first "title" should be "Game Hub | Welcome to the GameHub"
		And the first "h1" should be "WELCOME TO THE GAMEHUB"
		And the unordered list in header should be "Home Gamer123 Add Logout"