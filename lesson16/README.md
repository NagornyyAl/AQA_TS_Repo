# Заняття 16 - Cypress та Puppeteer

У папці `lesson16` знаходяться два окремі TypeScript-проєкти для автоматизованого тестування:

- `cypress/` - E2E-тести на Cypress.
- `puppeteer/` - тести на Puppeteer з Vitest.

Тести розділені на окремі модулі для кожного сайту:

- `rozetka` - сценарії з домашнього завдання №15.
- `hotline` - live-тести для реального сайту `https://hotline.ua/`.

## Покриття тестами

### Cypress

Модуль Rozetka:

- `TC-1` - пошук ноутбуків через поле пошуку в шапці.
- `TC-2` - відкриття категорії комп'ютерів через каталог.
- `TC-3` - додавання першого ноутбука до кошика.
- `TC-4` - видалення першого ноутбука з кошика.

Модуль Hotline:

- `TC-1` - пошук товарів `EcoFlow`.
- `TC-2` - пошук товарів `Deye`.
- `TC-3` - перевірка, що результати `EcoFlow` містять відповідні посилання.
- `TC-4` - перевірка, що результати `Deye` містять відповідні посилання.

### Puppeteer

Модуль Rozetka:

- `TC-1` - пошук ноутбуків через поле пошуку в шапці.
- `TC-2` - відкриття категорії комп'ютерів через каталог.
- `TC-3` - додавання першого ноутбука до кошика.
- `TC-4` - видалення першого ноутбука з кошика.

Модуль Hotline:

- `TC-1` - пошук товарів `EcoFlow`.
- `TC-2` - пошук товарів `Deye`.
- `TC-3` - перевірка, що результати `EcoFlow` містять відповідні посилання.
- `TC-4` - перевірка, що результати `Deye` містять відповідні посилання.

## Структура проєкту

### Cypress

```text
cypress/
  cypress/
    e2e/
      hotline/
        hotline-search.cy.ts
      rozetka/
        rozetka-homework15.cy.ts
    modules/
      hotline/
        price-comparison.page.ts
      rozetka/
        rozetka-homework.page.ts
    fixtures/
      rozetka/
        rozetka-homework15.html
```

### Puppeteer

```text
puppeteer/
  tests/
    hotline/
      hotline-search.spec.ts
    rozetka/
      rozetka-homework15.spec.ts
  src/
    modules/
      hotline/
        price-comparison.page.ts
      rozetka/
        rozetka-homework.page.ts
  fixtures/
    rozetka/
      rozetka-homework15.html
```

## Важлива примітка про Rozetka

Реальний сайт `https://rozetka.com.ua/ua/` блокує автоматизовані запуски через `403 Forbidden` або Cloudflare challenge.

Тому тести для Rozetka виконуються на локальній HTML-фікстурі, яка повторює потрібні елементи, селектори та дії з домашнього завдання №15. Це дозволяє перевірити логіку автотестів: введення тексту, кліки, перехід у категорію, роботу з кошиком та перевірки.

Тести для Hotline виконуються напряму на реальному сайті `https://hotline.ua/` без локальної HTML-фікстури.
