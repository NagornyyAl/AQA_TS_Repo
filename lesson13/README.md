# Заняття 13: інтеграційні та контрактні тести

## Схема інтеграційного тестування Cat API

Мета: довести, що модулі `breeds`, `images`, `votes` і `favourites` коректно взаємодіють навколо одного реального зображення.

1. `GET /breeds/search?q=siberian&attach_image=1`
    - Знайти реальну породу та зберегти `breed.id`.
    - Додатково перевірити ключові поля породи: `name`, `temperament`, `origin`, `description`, `weight`, `reference_image_id` і вкладений `image`.
2. `GET /breeds/{breed_id}`
    - Перевірити, що вибрану породу можна напряму прочитати з модуля Breeds.
    - Звірити ключові поля з результатом `/breeds/search`.
3. `GET /images/search?breed_ids={breed_id}&has_breeds=true&limit=1`
    - Отримати зображення, яке належить до вибраної породи.
    - Перевірити `image.id`, `image.url`, розміри зображення та ключові поля породи в `image.breeds[]`.
4. `POST /votes`
    - Створити vote з `image_id` з модуля Images та унікальним `sub_id`.
5. `GET /votes`
    - Прочитати votes і перевірити, що створений vote посилається на той самий `image_id` і `sub_id`.
    - Перевірити вкладений `image.id` і `image.url`, бо один лише `image_id` можна передати довільно.
6. `POST /favourites`
    - Створити favourite для того самого `image_id` і `sub_id`.
7. `GET /favourites/{favourite_id}` і `GET /favourites`
    - Перевірити, що favourite пов'язаний з тим самим зображенням і користувацьким сегментом.
    - Перевірити вкладений `image.id` і `image.url`.
8. Cleanup
    - Видалити створені favourite і vote, щоб повторні запуски не забруднювали акаунт.

                    Хід роботи:

Тесту потрібен реальний Cat API key, бо `votes` і `favourites` є account-scoped write endpoints.

Ключ локально в `lesson13/.env`:

```env
CAT_API_KEY=your-cat-api-key
```

Файл `.env` доданий у `.gitignore`. Якщо `CAT_API_KEY` відсутній, інтеграційний тест буде пропущений з поясненням.

## Postman-сценарії

Підготовлена Postman collection:

- `postman/Lesson13 API Scenarios.postman_collection.json`
- `postman/Lesson13 Local.postman_environment.example.json`

У collection є дві папки:

1. `Cat API Integration Flow`
    - Послідовний сценарій `breeds -> images -> votes -> favourites -> cleanup`.
    - Перевірки відповідають схемі вище: ключові поля `/breeds`, зв'язок `images` з `breeds`, вкладений `image` у `/votes` і `/favourites`.
2. `Petstore Store Order Smoke Scenario`
    - Postman-сценарій для `POST /v2/store/order`.
    - Повноцінне consumer/provider контрактне тестування цього endpoint покрите Pact-тестами в `tests/contracts`.

Запустити Cat API сценарій у Postman:

1. Імпортувати collection `postman/Lesson13 API Scenarios.postman_collection.json`.
2. Імпортувати environment example `postman/Lesson13 Local.postman_environment.example.json`.
3. У Postman environment задати `cat_api_key` у Current value.
4. Запустити папку `Cat API Integration Flow` через Collection Runner.

Реальний API key не доданий у Postman-файли.

## Схема контрактного тестування Petstore

Споживач: `PetstoreOrderConsumer`.
Надавач: `PetstoreOrderApi`.

1. Consumer Pact test запускає Pact mock provider.
2. Consumer client надсилає `POST /v2/store/order`.
3. Pact перевіряє запит і повертає відповідь типу `Order`.
4. Pact записує контракт у `pacts/PetstoreOrderConsumer-PetstoreOrderApi.json`.
5. Provider verification програє контракт проти `https://petstore.swagger.io`.

## Команди

npm install
npm run lint
npm run build
npm run test:contract
npm run test:integration
npm test

`npm test` спочатку запускає контрактний сценарій Petstore, а потім інтеграційні тести Cat API.
