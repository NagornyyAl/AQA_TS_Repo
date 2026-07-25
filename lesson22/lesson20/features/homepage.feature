Feature: Hotline.ua Homepage
    As a visitor of Hotline.ua
    I want to see all key elements on the homepage
    So that I can be confident the site loaded correctly

    Background:
        Given I open the Hotline.ua homepage

    Scenario: Key header elements are visible on homepage load
        Then the page title should mention "Hotline"
        And the header logo should be visible
        And the catalog button should be visible and contain text "Каталог"
        And the search input should be visible with placeholder "Знайти товар, магазин, бренд"
        And the city selector should show a non-empty city name
        And the footer should be visible
