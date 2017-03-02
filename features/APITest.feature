
Feature: REST API Testing with Cucumber

Scenario: Making a GET request to Github
    When I make a GET request to "https://api.github.com/users/tannyb"
    Then The response property "name" should be "Tanny "
    And also The response property "login" should be "TannyB"





