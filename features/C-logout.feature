Feature: Logout an account
	The user should be able to logout an account.

	Scenario: logout an account
		Given The browser is open on the home page
        When I login as "Vasper123" with password "123"
		And I click on the "logout" field	
		Then take a screenshot called "logged-out" in "logout"
        And the "title" number "0" should be "Game Hub | Welcome to the GameHub"
		And the "h1" number "0" should be "WELCOME TO THE GAMEHUB"
		And the unordered list in header should be "Home Login Register"
	