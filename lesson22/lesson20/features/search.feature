Feature: Hotline.ua Search
    As a visitor of Hotline.ua
    I want to search for products
    So that I can find relevant items quickly

    Background:
        Given I open the Hotline.ua homepage

    Scenario: Autosuggest shows relevant hints while typing a search query
        When I type "iphone 15" into the search input
        Then the autosuggest dropdown should be visible
        And the autosuggest should contain at least 1 suggestion
        And at least one suggestion should be relevant to "iphone"
        And the "show all results" link should contain "iphone 15"

    Scenario: Search results page shows matching products
        When I type "iphone 15" into the search input
        And I submit the search
        Then I should be navigated to the search results page
        And the results title should contain "iphone 15"
        And at least one product result should be displayed
        And at least one result title should be relevant to "iphone"
