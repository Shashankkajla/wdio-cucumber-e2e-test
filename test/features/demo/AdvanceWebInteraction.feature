Feature: Advance Web Interaction Session.

    # Given A web Page is opened <URL>   
    #is alreay written in feature file so don't write same step again for this just copy paste it
    # CamleCase write feature file name .

    # When we have multiple feature files than maintain seperate give.ts, when.ts and then.ts in stepdefinition 
    # that would be easier to debug.

    @demo2
    Scenario Outline: Advance WebInteraction Test Cases
        Given Login to inventory web Page
        # 1. Working with Web Elements and Iterating list use of map(), filter(), remove(), +, parseInt(), push()
        #Then Inventory page should list <NumberOfProducts>
        #Then Validate all product have valid price
        # 2. Handling WebTable 
        Then Handle the WebTable as per given mentioned scenarios
        Then get Single row based data as third condition
        Then get single cell value 
        Then get the single cell value based on another cell


        Examples:
            | TestID      |  NumberOfProducts  |
            | WebITR_002  |         6          |                                           