import { By } from 'selenium-webdriver';

export const hotlineSelectors = {
    searchInput: By.css('[aria-controls="autosuggest-autosuggest__results"]'),
    resultTitle: By.css('div.list-item a.item-title')
} as const;
