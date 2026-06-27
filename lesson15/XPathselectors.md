# Домашнє завдання 15 - XPath-селектори

Сайт: https://rozetka.com.ua/ua/

Дата перевірки: 27.06.2026

Перевірено в Google Chrome на реальному сайті Rozetka. Оформлення замовлення не виконуємо: перевірка зупиняється на додаванні товару в кошик і видаленні товару з кошика.

## TC-1. Пошук товару з хедера

Передумова: відкрита головна сторінка Rozetka.

| Крок | XPath-селектор | Дія / очікування |
| --- | --- | --- |
| 1 | `//input[@data-testid="search-suggest-input"]` | Вводимо `ноутбук` у поле пошуку. |
| 2 | `//button[@data-testid="search-suggest-submit"]` | Натискаємо кнопку `Знайти`. |

Результат перевірки: обидва селектори знайдені на сторінці, по 1 елементу. Поле пошуку приймає текст, кнопка пошуку клікабельна.

## TC-2. Відкриття каталогу

Передумова: відкрита головна сторінка Rozetka.

| Крок | XPath-селектор | Дія / очікування |
| --- | --- | --- |
| 1 | `//button[@data-testid="fat_menu_btn"]` | Натискаємо кнопку `Каталог`. |
| 2 | `//a[@data-testid="fat_menu_category_link" and contains(@href,"/ua/computers-notebooks/c80253/")]` | Натискаємо категорію `Ноутбуки та комп'ютери`. |

Результат перевірки: обидва селектори знайдені на головній сторінці, по 1 елементу.

## TC-3. Додавання першого товару з категорії в кошик

Передумова: відкрита сторінка категорії `https://rozetka.com.ua/ua/notebooks/c80004/`.

| Крок | XPath-селектор | Дія / очікування |
| --- | --- | --- |
| 1 | `//h1[contains(normalize-space(),"Ноутбуки")]` | Перевіряємо, що заголовок сторінки містить `Ноутбуки`. |
| 2 | `(//rz-catalog-tile)[1]` | Очікуємо першу картку товару в каталозі. |
| 3 | `(//rz-catalog-tile)[1]//button[@aria-label="Купити"]` | Натискаємо кнопку `Купити` в першій картці товару. |
| 4 | `//button[@data-testid="header-cart-btn"]` | Натискаємо іконку кошика в хедері. Після додавання товару лічильник показує `1`. |
| 5 | `//rz-shopping-cart` | Очікуємо відкриття кошика. |
| 6 | `//li[contains(@class,"cart-list__item")]` | Перевіряємо, що в кошику є товар. |
| 7 | `//div[contains(@class,"cart-product__body")]` | Перевіряємо блок з інформацією про товар. |
| 8 | `//span[contains(@class,"cart-product__title")]` | Перевіряємо назву доданого товару. |

Результат перевірки: товар додано до кошика, кошик відкрився, товар відображається.

## TC-4. Видалення товару з кошика

Передумова: кошик відкритий і в ньому є 1 товар.

| Крок | XPath-селектор | Дія / очікування |
| --- | --- | --- |
| 1 | `//button[@id="cartProductActions0"]` | Натискаємо меню дій першого товару в кошику. |
| 2 | `//div[contains(@class,"menu-list-wrap") and @id="cartProductActions0"]//button[contains(normalize-space(),"Видалити")]` | Натискаємо пункт `Видалити`. |
| 3 | `//div[@data-testid="empty-cart"]` | Очікуємо повідомлення `Кошик порожній`. |

Результат перевірки: товар видалено, відображається порожній кошик.

## Результат перевірки XPath-селекторів

| Стан сторінки | XPath-селектор | Знайдено |
| --- | --- | --- |
| Головна | `//button[@data-testid="fat_menu_btn"]` | 1 |
| Головна | `//input[@data-testid="search-suggest-input"]` | 1 |
| Головна | `//button[@data-testid="search-suggest-submit"]` | 1 |
| Головна | `//button[@data-testid="header-cart-btn"]` | 1 |
| Головна | `//a[@data-testid="fat_menu_category_link" and contains(@href,"/ua/computers-notebooks/c80253/")]` | 1 |
| Категорія ноутбуків | `//h1[contains(normalize-space(),"Ноутбуки")]` | 1 |
| Категорія ноутбуків | `//rz-catalog-tile` | 60 |
| Категорія ноутбуків | `(//rz-catalog-tile)[1]` | 1 |
| Категорія ноутбуків | `(//rz-catalog-tile)[1]//button[@aria-label="Купити"]` | 1 |
| Категорія ноутбуків | `//button[contains(@class,"buy-button") and @aria-label="Купити"]` | 60 |
| Після додавання товару | `//button[@data-testid="header-cart-btn"]` | 1 |
| Відкритий кошик | `//rz-shopping-cart` | 1 |
| Відкритий кошик | `//li[contains(@class,"cart-list__item")]` | 1 |
| Відкритий кошик | `//div[contains(@class,"cart-product__body")]` | 2 |
| Відкритий кошик | `//span[contains(@class,"cart-product__title")]` | 1 |
| Відкритий кошик | `//button[@id="cartProductActions0"]` | 1 |
| Меню товару в кошику | `//div[contains(@class,"menu-list-wrap") and @id="cartProductActions0"]` | 1 |
| Меню товару в кошику | `//div[contains(@class,"menu-list-wrap") and @id="cartProductActions0"]//button[contains(normalize-space(),"Видалити")]` | 1 |
| Після видалення товару | `//div[@data-testid="empty-cart"]` | 1 |
