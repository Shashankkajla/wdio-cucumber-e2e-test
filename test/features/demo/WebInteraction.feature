Feature: Web Interaction Session.


    @demo1
    Scenario Outline: WebInteraction Test Cases
        Given A web Page is opened <URL>
        When Perform WebInteraction
        When Perform action to Handle DropDown

        Examples:
            | TestID    |              URL                    |
            | WebITR001 | https://the-internet.herokuapp.com/ |