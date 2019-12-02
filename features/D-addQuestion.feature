Feature: Create a question
	The user should be able to create a question.

    Scenario: createQuestion page
		Given The browser is open on the home page
        When I login as "Vasper123" with password "123"
		And I click on the "add" field
		Then take a screenshot called "createquestion-page" in "addQuestion"
		And the "title" number "0" should be "Game Hub | Create a question"
		And the "h1" number "0" should be "CREATE A QUESTION"
		And the "h1" number "1" should be "Create a Question"
		And the "ul" number "0" should be "Home  Vasper123 Add Logout"

	Scenario: create a question without an image
		Given The browser is open on the home page
        When I login as "Vasper123" with password "123"
		And I create the question title:"Call of Duty" body:"How to find pack-a-punch on Die Riese"
		Then take a screenshot called "question-created" in "addQuestion"
        And the page should be the home page logged in as "Vasper123"
		And the "article" number "0" should be
			"""
			Call of Duty
			Sam Smith 
			{current date}
			"""

	Scenario: create another question without an image 
		Given The browser is open on the home page
        When I login as "Gamer123" with password "1234"
		And I create the question title:"Skyrim Elder Scrolls V" body:"Best way to kill Alduin" 
		Then take a screenshot called "question2-created" in "addQuestion"
        And the page should be the home page logged in as "Gamer123"
		And the "article" number "1" should be
			"""
			Skyrim Elder Scrolls V
			Emma Jones
			{current date}
			"""	
	Scenario: create a question with image 
		Given The browser is open on the home page
        When I login as "Gamer123" with password "1234"
		And I click on the "add" field
		And I enter "The Witcher 3: Wild Hunt" in the "title" field
		And I enter "Best way to get money" in the "body" field
		And I enter image "public/images/tests/wolf-armour.png" in the "image" field
		And I click on the "submit" field 
		Then take a screenshot called "question-image-created" in "addQuestion"
        And the page should be the home page logged in as "Gamer123"
		And the "article" number "2" should be
			"""
			The Witcher 3: Wild Hunt
			Emma Jones
			{current date}
			"""
	Scenario: create a third question without an image 
		Given The browser is open on the home page
        When I login as "Vasper123" with password "123"
		And I create the question title:"Elder Scrolls Online" body:"Fastest way to get exp" 
		Then take a screenshot called "question3-created" in "addQuestion"
        And the page should be the home page logged in as "Vasper123"
		And the "article" number "3" should be
			"""
			Elder Scrolls Online
			Sam Smith 
			{current date}
			"""	