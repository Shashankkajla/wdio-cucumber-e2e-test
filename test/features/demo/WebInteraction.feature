Feature: Web Interaction Session.


    @demo @sanity
    Scenario Outline: WebInteraction Test Cases
        Given A web Page is opened <URL>
        When Perform WebInteraction
       # When Perform action to Handle DropDown
       # When Perform CheckBox Handling
        # When performing Window Handling
        # When performing AlertPop Handling
       #  When performing File Uploads
        # When performing Frames Handling
        When performing keyPress and scrolling


        Examples:
            | TestID    |              URL                    |
            | WebITR001 | https://the-internet.herokuapp.com/ |