
Feature: UI Testing with Cucumber

Scenario: Go to Github and try to sign up
    When I navigate to "https://github.com"
    And I click on "Sign Up"
    And I type UserName as "User1"
    Then The error message says "Username is already taken"

    When I again type Username as "iuuhio86789"
    Then I see no error





