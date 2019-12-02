Feature: Create an answer
	The user should be able to create an answer for a given question.

    Scenario: answer page when logged in
		Given The browser is open on the home page
        When I login as "Vasper123" with password "123"
		And I click on question id "1"
		Then take a screenshot called "answer-page-logged-in" in "answer"
		And the "title" number "0" should be "Game Hub | Call of Duty"
		And the "h1" number "0" should be "CALL OF DUTY"
		And the "h2" number "0" should be "How to find pack-a-punch on Die Riese"
		And the "ul" number "0" should be "Home  Vasper123 Add Logout"

    Scenario: answer page when not logged in
		Given The browser is open on the home page
		And I click on question id "1"
		Then take a screenshot called "answer-page-not-logged-in" in "answer"
		And the "title" number "0" should be "Game Hub | Call of Duty"
		And the "h1" number "0" should be "CALL OF DUTY"
		And the "h2" number "0" should be "How to find pack-a-punch on Die Riese"
		And the "ul" number "0" should be "Home Login Register"

    Scenario: create an answer for question when logged in
		Given The browser is open on the home page
       	When I login as "Vasper123" with password "123"
		And I click on question id "1"
		And I enter "It is located at the starting area after all the teleporters are turned on" in the "answer" field
        And I click on the "submit" field
        Then take a screenshot called "question-answer-created" in "answer"
		And the "title" number "0" should be "Game Hub | Call of Duty"
		And the "h1" number "0" should be "CALL OF DUTY"
		And the "h2" number "0" should be "How to find pack-a-punch on Die Riese"
		And the "ul" number "0" should be "Home  Vasper123 Add Logout"
        And the "article" number "0" should be
			"""
			It is located at the starting area after all the teleporters are turned on
			
			{current date}
			
			Sam Smith

			Rate this answer
			0
			1
			2
			3
			4
			5
			 

			Average: 0
			"""

    Scenario: create another answer for question when logged in
		Given The browser is open on the home page
        When I login as "Gamer123" with password "1234"
		And I click on question id "1"
		And I enter "Starting area" in the "answer" field
        And I click on the "submit" field
        Then take a screenshot called "question-answer2-created" in "answer"
		And the "title" number "0" should be "Game Hub | Call of Duty"
		And the "h1" number "0" should be "CALL OF DUTY"
		And the "h2" number "0" should be "How to find pack-a-punch on Die Riese"
		And the "ul" number "0" should be "Home  Gamer123 Add Logout"
		And the "article" number "1" should be 
			"""
			Starting area
			
			{current date}

			Emma Jones

			Rate this answer
			0
			1
			2
			3
			4
			5
			 

			Average: 0
			"""

    Scenario: create an answer for question2 when loggin in
		Given The browser is open on the home page
        When I login as "Vasper123" with password "123"
		And I click on question id "2"
		And I enter "Use a daedric bow with daedric arrows" in the "answer" field
        And I click on the "submit" field
        Then take a screenshot called "question2-answer-created" in "answer"
		And the "title" number "0" should be "Game Hub | Skyrim Elder Scrolls V"
		And the "h1" number "0" should be "SKYRIM ELDER SCROLLS V"
		And the "h2" number "0" should be "Best way to kill Alduin"
		And the "ul" number "0" should be "Home  Vasper123 Add Logout"
		And the "article" number "0" should be
			"""
			Use a daedric bow with daedric arrows
			
			{current date}
			
			Sam Smith

			Rate this answer
			0
			1
			2
			3
			4
			5
			 

			Average: 0
			"""
