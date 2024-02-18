Feature: Handling multiple Data in Key value pair using dotEnv file

@env
Scenario Outline: User is able to logged in Successfully in sauce Labs Application.
    Given user provides url to be launched
    When user enters username and password
    Then user click on Login button


    Examples:
        | TestCaseID  | 
        | dotEnv_001  | 

    
@testenv
Scenario: User is able to logged in Successfully in sauce Labs Application.
    Given user provides url from testEnv
    When user enters username and password for testEnv
       