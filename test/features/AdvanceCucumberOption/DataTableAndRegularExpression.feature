Feature: User able to login in sauseLabs Application

- Background should come on Top of feature 
- Also you can remove the UserType as its an Array

Background: User able to launch Chrome 
    Given user provides saucelab url 


@advance
Scenario: User able to login with the users.
     When user logged in as standard user.
     | UserType       | UserName         |
     | standard_Un    | standard_user    |
     | locked_Un      | locked_out_user  |
     |  problem_Un    |  problem_user    |
     |   error_Un     |   error_user     |

      


@advance1
Scenario Outline: Using Logged In with different names
     When user logged in <UserName> and <Password>
     
     
     
     Examples:
            | UserName        |  Password    |
            | standard_user   | secret_sauce |
            | locked_out_user | secret_sauce |   
            | problem_user    | secret_sauce |
            | error_user      | secret_sauce |



@worldTag
Scenario: Setting up the world object.
    When setUp the Header on the login Page
    When call that header in another step here 


#@scTag
#Scenario: <TestID_1234> : Testing the id
 #    When user get the id
