Feature: My First Feature in WDIO Test

    @demo @sanity @debug
    Scenario Outline: Run First Demo Feature
        Given Google Page is opened
        When Search with <SearchItems>
        Then click on the first search result
        Then URL should match <ExpectedURL>

        Examples:
            | TestCaseID  | SearchItems | ExpectedURL           |
            | Demo_TC_001 | WDIO        | https://webdriver.io/ |