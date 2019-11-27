Feature: Edit a profile
	The user should be able to edit thier profile.

    Scenario: profile page
		Given The browser is open on the login page
		When I click on the "login" field
		And I enter "Vasper123" in the "username" field
		And I enter "123" in the "password" field
		And I click on the "submit" field
        And I click on the "profile" field
        Then take a screenshot called "profile-page" in "profile"
        And the first "title" should be "Game Hub | Sam Smith's Profile"
        And the first "h1" should be "SAM SMITH'S PROFILE"
        
        And the "h1" number "1" should be "Profile"
		
        And the unordered list in header should be "Home Vasper123 Add Logout"
