Feature: Create a question
	The user should be able to create a question.

    Scenario: createQuestion page
		Given The browser is open on the home page
        When I click on the "login" field
		And I enter "Vasper123" in the "username" field
		And I enter "123" in the "password" field
		And I click on the "submit" field
		And I click on the "add" field
		Then take a screenshot called "createquestion-page" in "addQuestion"
		And the first "title" should be "Game Hub | Create a question"
		And the first "h1" should be "CREATE A QUESTION"
		And the "h1" number "1" should be "Create a Question"
		And the unordered list in header should be "Home Vasper123 Add Logout"

	Scenario: create a question without image
		Given The browser is open on the home page
        When I click on the "login" field
		And I enter "Vasper123" in the "username" field
		And I enter "123" in the "password" field
		And I click on the "submit" field
		And I click on the "add" field
        And I enter "Call of Duty" in the "title" field
        And I enter "How to find pack-a-punch on Die Riese" in the "body" field
        And I click on the "submit" field
		Then take a screenshot called "question-created" in "addQuestion"
        And the first "title" should be "Game Hub | Welcome to the GameHub"
		And the first "h1" should be "WELCOME TO THE GAMEHUB"
		And the unordered list in header should be "Home Vasper123 Add Logout"
		And the first "h2" should be "Call of Duty"
		And the first "h3" should be "How to find pack-a-punch on Die Riese"
