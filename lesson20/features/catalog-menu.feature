Feature: Hotline.ua Catalog menu
    As a visitor of Hotline.ua
    I want to browse categories via the catalog menu
    So that I can navigate to a category page

    Background:
        Given I open the Hotline.ua homepage

    Scenario Outline: Navigate to a category page from the catalog menu
        When I open the catalog menu
        Then the catalog menu should contain more than 1 category
        And the catalog menu should contain category "<category>"
        When I click category "<category>" in the catalog menu
        Then I should be navigated to a URL containing "<urlPart>"
        And the category page heading should not be empty
        And the breadcrumbs should include "<breadcrumbText>"

        Examples:
            | category                   | urlPart     | breadcrumbText   |
            | Смартфони, Смарт-годинники | /ua/mobile/ | Смартфони        |
            | Побутова техніка           | /ua/bt/     | Побутова техніка |
