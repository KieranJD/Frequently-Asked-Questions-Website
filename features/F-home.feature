Feature: Open Home page
	The user should be able to view the home page.

    Scenario: home page
		Given The browser is open on the home page
        Then take a screenshot called "home-page" in "home"
        And the first "title" should be "Game Hub | Welcome to the GameHub"
		And the first "h1" should be "WELCOME TO THE GAMEHUB"
		And the unordered list in header should be "Home Login Register"
