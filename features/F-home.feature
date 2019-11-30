Feature: Open Home page
	The user should be able to view the home page.

    Scenario: home page
		    Given The browser is open on the home page
        Then take a screenshot called "home-page" in "home"
        And the "title" number "0" should be "Game Hub | Welcome to the GameHub"
		    And the "h1" number "0" should be "WELCOME TO THE GAMEHUB"
		    And the "ul" number "0" should be "Home Login Register"

    Scenario: home page link
		    Given The browser is open on the "register" page
        When I click on the "home" field
        Then take a screenshot called "home-page-another" in "home"
        And the "title" number "0" should be "Game Hub | Welcome to the GameHub"
		    And the "h1" number "0" should be "WELCOME TO THE GAMEHUB"
		    And the "ul" number "0" should be "Home Login Register"
    
    Scenario: home page logo button
		    Given The browser is open on the "login" page
        When I click on the "logo" field
        Then take a screenshot called "home-page-button" in "home"
        And the "title" number "0" should be "Game Hub | Welcome to the GameHub"
	  	  And the "h1" number "0" should be "WELCOME TO THE GAMEHUB"
	  	  And the "ul" number "0" should be "Home Login Register"

    Scenario: search for Elder Scrolls questions
      Given The browser is open on the home page
      When I enter "Elder Scrolls" in the "searchbar" field
      And I click on the "submit" field
      Then take a screenshot called "search-elder-scrolls" in "home"
      And the "title" number "0" should be "Game Hub | Welcome to the GameHub"
	  	And the "h1" number "0" should be "WELCOME TO THE GAMEHUB"
	  	And the "ul" number "0" should be "Home Login Register"
      And the amount of questions shown should be "2"
      And the "article" number "0" should be
			"""
			Skyrim Elder Scrolls V
			Emma Jones
			{current date}
			"""	
      And the "article" number "1" should be
			"""
			Elder Scrolls Online
			Sam Smith
			{current date}
			"""	
    Scenario: search for Call of Duty questions
      Given The browser is open on the home page
      When I enter "Call of Duty" in the "searchbar" field
      And I click on the "submit" field
      Then take a screenshot called "call-of-duty" in "home"
      And the "title" number "0" should be "Game Hub | Welcome to the GameHub"
	  	And the "h1" number "0" should be "WELCOME TO THE GAMEHUB"
	  	And the "ul" number "0" should be "Home Login Register"
      And the amount of questions shown should be "1"
      And the "article" number "0" should be
			"""
			Call of Duty
			Sam Smith
			{current date}
			"""	