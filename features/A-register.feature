Feature: Register an account
	The user should be able to register an account.

	Scenario: register page
		Given The browser is open on the home page
		When I click on the "register" field
		Then take a screenshot called "regsiter-page" in "register"
		And the "title" number "0" should be "Game Hub | Create an account"
		And the "h1" number "0" should be "CREATE AN ACCOUNT"
		And the "h1" number "1" should be "Sign Up"
		And the "ul" number "0" should be "Home Login Register"

	Scenario: create an account without profile picture
		Given The browser is open on the home page
		When I register as "Sam Smith" with username "Vasper123" and password "123"
		Then take a screenshot called "regsitered" in "register"
		And the page should be the home page logged in as "Vasper123" 
	
	Scenario: create another account with profile picture
		Given The browser is open on the home page
		When I register as "Emma Jones" with username "Gamer123" and password "1234"
		Then take a screenshot called "regsitered-another" in "register"
		And the page should be the home page logged in as "Gamer123"