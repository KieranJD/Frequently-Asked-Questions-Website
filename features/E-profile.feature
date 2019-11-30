Feature: Edit a profile
    The user should be able to edit thier profile.

    Scenario: profile page
        Given The browser is open on the home page
        When I login as "Vasper123" with password "123"
        And I click on the "profile" field
        Then take a screenshot called "profile-page" in "profile"
        And the "title" number "0" should be "Game Hub | Sam Smith's Profile"
        And the "h1" number "0" should be "SAM SMITH'S PROFILE"     
        And the "h1" number "1" should be "Profile"
        And the "ul" number "0" should be "Home  Vasper123 Add Logout"

    Scenario: change profile avatar
        Given The browser is open on the home page
        When I login as "Gamer123" with password "1234"
        And I click on the "profile" field
        And I enter image "public/images/tests/python-logo.png" in the "avatar-input" field
        And I click on the "submit" field
        Then take a screenshot called "avatar" in "profile"
        

