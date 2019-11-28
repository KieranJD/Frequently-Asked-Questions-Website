Feature: Open Home page
	The user should be able to view the home page.

    Scenario: home page
		Given The browser is open on the home page
        Then take a screenshot called "home-page" in "home"
        And the first "title" should be "Game Hub | Welcome to the GameHub"
		And the first "h1" should be "WELCOME TO THE GAMEHUB"
		And the unordered list in header should be "Home Login Register"

    Scenario: home page link
		Given The browser is open on the register page
        When I click on the "home" field
        Then take a screenshot called "home-page-another" in "home"
        And the first "title" should be "Game Hub | Welcome to the GameHub"
		And the first "h1" should be "WELCOME TO THE GAMEHUB"
		And the unordered list in header should be "Home Login Register"
    
    Scenario: home page logo button
		Given The browser is open on the login page
        When I click on the "logo" field
        Then take a screenshot called "home-page-button" in "home"
        And the first "title" should be "Game Hub | Welcome to the GameHub"
		And the first "h1" should be "WELCOME TO THE GAMEHUB"
		And the unordered list in header should be "Home Login Register"
