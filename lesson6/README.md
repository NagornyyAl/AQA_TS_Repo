# Асинхронність у JavaScript. Обробка помилок та дебагінг

## Мета уроку

Після цього уроку потрібно розуміти:

- що таке асинхронність у JavaScript;
- як працюють `Promise`, `async` та `await`;
- як обробляти помилки в асинхронному коді;
- як дебажити синхронний та асинхронний код;
- які підходи вважаються хорошою практикою під час роботи з асинхронністю.

## Теми зі списку

- JS. Обробка помилок
- JS. Обробка помилок. try...catch...finally
- JS. Обробка помилок. try...catch
- JS. Обробка помилок. Багаторівневість try...catch
- JS. Обробка помилок. Власні об'єкти помилок
- JS. Дебагінг
- JS. Дебагінг. Демо
- JS. Асинхронність
- JS. Асинхронність. Promise
- JS. Асинхронність. Promise. Обробники
- JS. Асинхронність. Promise. Створення
- JS. Асинхронність. Promise. Обробка помилок
- JS. Асинхронність. Promise. Підсумки
- JS. Асинхронність. Promise. Демо
- JS. Асинхронність. Promise API
- JS. Асинхронність. async...await
- JS. Асинхронність. async...await. Демо з fetch
- JS. Асинхронність. Race conditions
- JS. Асинхронність. Race conditions. Демо

## Що таке асинхронність

JavaScript виконує код в одному основному потоці. Це означає, що довгі операції можуть заблокувати виконання наступних інструкцій.

Асинхронність дозволяє запускати операції, які займають час, і не блокувати основний потік виконання.

Типові асинхронні операції:

- запити до API;
- читання або запис файлів;
- таймери;
- робота з базою даних;
- очікування відповіді від браузера або зовнішнього сервісу;
- автоматизовані UI-дії в тестах.

Приклад:

```js
console.log('Start');

setTimeout(() => {
  console.log('Async operation');
}, 1000);

console.log('End');
```

Результат:

```text
Start
End
Async operation
```

Функція `setTimeout` не блокує виконання коду. JavaScript продовжує виконувати наступні рядки, а callback виконується пізніше.

## Event Loop

Event Loop відповідає за те, коли асинхронні задачі потрапляють назад у стек виконання.

Основні частини:

- **Call Stack** - місце, де виконуються функції;
- **Web APIs / Node APIs** - середовище, де очікують таймери, мережеві запити та інші асинхронні операції;
- **Task Queue** - черга задач, наприклад callbacks з `setTimeout`;
- **Microtask Queue** - черга мікрозадач, наприклад `Promise.then`, `catch`, `finally`.

Мікрозадачі мають вищий пріоритет, ніж звичайні задачі.

```js
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');
```

Результат:

```text
1
4
3
2
```

## Callback

Callback - це функція, яку передають в іншу функцію як аргумент і викликають пізніше.

```js
function loadUser(callback) {
  setTimeout(() => {
    callback({ id: 1, name: 'Alex' });
  }, 1000);
}

loadUser((user) => {
  console.log(user.name);
});
```

Недолік callbacks - складність читання, коли асинхронних операцій багато.

```js
getUser((user) => {
  getOrders(user.id, (orders) => {
    getPayment(orders[0].id, (payment) => {
      console.log(payment);
    });
  });
});
```

Такий код часто називають callback hell.

## Promise

`Promise` - це об'єкт, який представляє результат асинхронної операції.

Promise може бути в одному зі станів:

- `pending` - операція ще виконується;
- `fulfilled` - операція завершилась успішно;
- `rejected` - операція завершилась з помилкою.

```js
const promise = new Promise((resolve, reject) => {
  const isSuccess = true;

  setTimeout(() => {
    if (isSuccess) {
      resolve('Operation completed');
    } else {
      reject(new Error('Operation failed'));
    }
  }, 1000);
});

promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    console.log('Finished');
  });
```

## async / await

`async` та `await` роблять асинхронний код схожим на синхронний.

Функція з `async` завжди повертає `Promise`.

```js
async function getUser() {
  return { id: 1, name: 'Alex' };
}

getUser().then((user) => {
  console.log(user);
});
```

`await` зупиняє виконання поточної `async` функції до завершення Promise.

```js
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function run() {
  console.log('Start');
  await delay(1000);
  console.log('End');
}

await run();
```

## Послідовне та паралельне виконання

Послідовне виконання потрібне, коли наступна операція залежить від попередньої.

```js
const user = await getUser();
const orders = await getOrders(user.id);
const payment = await getPayment(orders[0].id);
```

Паралельне виконання краще використовувати, коли операції незалежні одна від одної.

```js
const [user, products, settings] = await Promise.all([
  getUser(),
  getProducts(),
  getSettings(),
]);
```

`Promise.all` завершується з помилкою, якщо хоча б один Promise буде відхилено.

Якщо потрібно отримати результат кожної операції незалежно від успіху або помилки, використовуйте `Promise.allSettled`.

```js
const results = await Promise.allSettled([
  getUser(),
  getProducts(),
  getSettings(),
]);

console.log(results);
```

## Обробка помилок

У синхронному коді помилки обробляються через `try...catch`.

```js
try {
  const data = JSON.parse('{ invalid json }');
  console.log(data);
} catch (error) {
  console.error('JSON parsing failed:', error.message);
}
```

В асинхронному коді з `Promise` помилки обробляються через `.catch`.

```js
fetch('https://example.com/api/users')
  .then((response) => response.json())
  .then((users) => {
    console.log(users);
  })
  .catch((error) => {
    console.error('Request failed:', error.message);
  });
```

З `async / await` використовуйте `try...catch`.

```js
async function loadUsers() {
  try {
    const response = await fetch('https://example.com/api/users');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Cannot load users:', error.message);
    throw error;
  }
}
```

Важливо не приховувати помилки без причини. Якщо функція не може коректно обробити помилку, її потрібно прокинути вище через `throw`.

## try...catch...finally

`try...catch...finally` використовується, коли потрібно виконати код незалежно від того, була помилка чи ні.

```js
async function openConnection() {
  console.log('Connection opened');
}

async function closeConnection() {
  console.log('Connection closed');
}

async function readData() {
  throw new Error('Cannot read data');
}

try {
  await openConnection();
  await readData();
} catch (error) {
  console.error('Error:', error.message);
} finally {
  await closeConnection();
}
```

`finally` часто використовують для очищення ресурсів:

- закрити з'єднання;
- видалити тестові дані;
- закрити браузер;
- зробити фінальний лог;
- звільнити файл або сесію.

## Багаторівневість try...catch

Помилку можна обробити на різних рівнях програми. Нижчий рівень може додати технічний контекст, а верхній рівень може прийняти рішення, що робити далі.

```js
async function getUserFromApi(userId) {
  try {
    const response = await fetch(`https://example.com/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Cannot load user ${userId}: ${error.message}`);
  }
}

async function runTest() {
  try {
    const user = await getUserFromApi(1);
    console.log(user);
  } catch (error) {
    console.error('Test failed:', error.message);
    throw error;
  }
}
```

Важливо не дублювати однакову обробку на кожному рівні. Якщо рівень не додає корисного контексту, краще дозволити помилці піднятися вище.

## Кастомні помилки

Для більш точного опису проблеми можна створювати власні класи помилок.

```js
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

async function checkResponse(response) {
  if (!response.ok) {
    throw new ApiError('API request failed', response.status);
  }

  return response.json();
}
```

Такі помилки легше перевіряти в тестах.

```js
try {
  await checkResponse(response);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(error.statusCode);
  }
}
```

## Типові помилки в асинхронному коді

### Забутий await

```js
async function test() {
  const user = getUser();
  console.log(user.name);
}
```

`user` буде Promise, а не реальний об'єкт користувача.

Правильно:

```js
async function test() {
  const user = await getUser();
  console.log(user.name);
}
```

### Помилка не обробляється

```js
async function test() {
  await loadUsers();
}
```

Якщо `loadUsers` завершиться з помилкою, її потрібно або обробити, або дозволити тестовому фреймворку коректно зафейлити тест.

```js
async function test() {
  try {
    await loadUsers();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
```

### forEach з async

`forEach` не очікує завершення async callback.

```js
users.forEach(async (user) => {
  await updateUser(user);
});
```

Краще використовувати `for...of`, якщо потрібна послідовність.

```js
for (const user of users) {
  await updateUser(user);
}
```

Або `Promise.all`, якщо операції можна виконувати паралельно.

```js
await Promise.all(
  users.map((user) => {
    return updateUser(user);
  }),
);
```

## Дебагінг

Дебагінг - це процес пошуку причини некоректної поведінки програми.

Основні інструменти:

- `console.log`;
- `console.error`;
- breakpoint у редакторі коду;
- `debugger`;
- stack trace;
- ESLint;
- DevTools у браузері;
- Node.js inspector.

## console.log та console.error

Найпростіший спосіб перевірити значення:

```js
console.log('user:', user);
console.error('error:', error);
```

Для об'єктів зручно використовувати `console.table`.

```js
console.table(users);
```

Для вимірювання часу:

```js
console.time('load users');
await loadUsers();
console.timeEnd('load users');
```

## debugger

Інструкція `debugger` зупиняє виконання коду, якщо підключений дебагер.

```js
async function loadUsers() {
  const response = await fetch('https://example.com/api/users');
  debugger;
  return response.json();
}
```

Після зупинки можна перевіряти змінні, виконувати код у консолі та переходити по кроках.

## Stack Trace

Stack trace показує шлях викликів, який привів до помилки.

```text
Error: User not found
    at getUser (src/user.js:10:11)
    at runTest (src/test.js:5:20)
```

З нього можна зрозуміти:

- де саме виникла помилка;
- яка функція її викликала;
- які файли та рядки потрібно перевірити.

## Дебагінг. Демо

Приклад простого сценарію для дебагінгу:

```js
function calculateDiscount(price, percent) {
  if (percent < 0 || percent > 100) {
    throw new Error('Percent must be between 0 and 100');
  }

  const discount = (price * percent) / 100;
  return price - discount;
}

function printFinalPrice() {
  const price = 120;
  const percent = 15;

  debugger;

  const finalPrice = calculateDiscount(price, percent);
  console.log('Final price:', finalPrice);
}

printFinalPrice();
```

Що перевірити в дебагері:

- значення `price` і `percent`;
- вхід у функцію `calculateDiscount`;
- значення `discount`;
- результат `finalPrice`;
- stack trace, якщо передати некоректний `percent`.

## Дебагінг Promise

Якщо Promise завершується з помилкою, але її ніхто не обробляє, виникає unhandled rejection.

```js
async function run() {
  Promise.reject(new Error('Something went wrong'));
}

await run();
```

Правильно:

```js
async function run() {
  await Promise.reject(new Error('Something went wrong'));
}

try {
  await run();
} catch (error) {
  console.error(error.message);
}
```

## Promise. Обробники

Для Promise є три основні обробники:

- `.then()` - виконується після успішного завершення;
- `.catch()` - виконується після помилки;
- `.finally()` - виконується завжди.

```js
loadUsers()
  .then((users) => {
    console.log('Users:', users);
  })
  .catch((error) => {
    console.error('Loading users failed:', error.message);
  })
  .finally(() => {
    console.log('Request finished');
  });
```

Обробники можна ланцюжити.

```js
getToken()
  .then((token) => getUser(token))
  .then((user) => getOrders(user.id))
  .then((orders) => {
    console.log(orders);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

## Promise. Створення

Promise створюється через конструктор `new Promise`.

```js
function waitForElement(selector, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();

    const intervalId = setInterval(() => {
      const element = document.querySelector(selector);

      if (element) {
        clearInterval(intervalId);
        resolve(element);
        return;
      }

      if (Date.now() - startedAt > timeout) {
        clearInterval(intervalId);
        reject(new Error(`Element ${selector} was not found`));
      }
    }, 100);
  });
}
```

У Node.js або браузері не потрібно створювати Promise вручну для кожної операції. Часто API вже повертає Promise.

## Promise. Обробка помилок

Помилка всередині `.then()` автоматично переводить Promise у стан `rejected`.

```js
Promise.resolve({ name: 'Alex' })
  .then((user) => {
    return user.profile.email;
  })
  .catch((error) => {
    console.error('Promise chain failed:', error.message);
  });
```

Якщо після `.catch()` повернути значення, наступний `.then()` отримає це значення як успішний результат.

```js
getUser()
  .catch(() => {
    return { id: 0, name: 'Guest' };
  })
  .then((user) => {
    console.log(user.name);
  });
```

## Promise. Підсумки

- Promise описує майбутній результат асинхронної операції.
- Promise має стани `pending`, `fulfilled`, `rejected`.
- Для успішного результату використовується `.then()`.
- Для помилок використовується `.catch()`.
- Для фінальної дії використовується `.finally()`.
- `async / await` є зручним синтаксисом для роботи з Promise.
- Помилки з `await` обробляються через `try...catch`.

## Promise. Демо

```js
function loadProduct(productId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!productId) {
        reject(new Error('Product id is required'));
        return;
      }

      resolve({
        id: productId,
        title: 'Laptop',
        price: 1200,
      });
    }, 500);
  });
}

loadProduct(1)
  .then((product) => {
    console.log(product.title);
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    console.log('Demo finished');
  });
```

## Promise API

Основні методи Promise API:

- `Promise.resolve(value)` - створює успішний Promise;
- `Promise.reject(error)` - створює відхилений Promise;
- `Promise.all(promises)` - очікує всі Promise або падає на першій помилці;
- `Promise.allSettled(promises)` - очікує всі Promise і повертає статус кожного;
- `Promise.race(promises)` - повертає результат першого Promise, який завершився;
- `Promise.any(promises)` - повертає перший успішний результат.

```js
const requests = [
  fetch('/api/users'),
  fetch('/api/products'),
  fetch('/api/settings'),
];

const responses = await Promise.all(requests);
console.log(responses.length);
```

## async...await. Демо з fetch

`fetch` повертає Promise, тому його зручно використовувати з `async / await`.

```js
async function loadPost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

try {
  const post = await loadPost(1);
  console.log(post.title);
} catch (error) {
  console.error('Cannot load post:', error.message);
}
```

## Race conditions

Race condition - це ситуація, коли результат залежить від того, яка асинхронна операція завершиться першою.

Приклад проблеми:

```js
let currentUser;

async function selectUser(userId) {
  const user = await loadUser(userId);
  currentUser = user;
}

selectUser(1);
selectUser(2);
```

Якщо запит для користувача `1` завершиться після запиту для користувача `2`, він може перезаписати `currentUser` старими даними.

## Race conditions. Демо

Один зі способів уникнути race condition - перевіряти актуальність запиту.

```js
let lastRequestId = 0;
let currentUser;

async function selectUser(userId) {
  const requestId = ++lastRequestId;
  const user = await loadUser(userId);

  if (requestId !== lastRequestId) {
    return;
  }

  currentUser = user;
}

await Promise.all([
  selectUser(1),
  selectUser(2),
]);

console.log(currentUser);
```

У тестах race conditions часто проявляються як нестабільні падіння. Якщо тест іноді проходить, а іноді падає без зміни коду, потрібно перевірити очікування, порядок асинхронних дій і залежність від часу.

## Приклад для QA Automation

Асинхронність часто використовується в автоматизованих тестах, бо майже кожна дія в браузері або API-запит потребує очікування.

```js
async function login(page, email, password) {
  await page.goto('https://example.com/login');
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard');
}
```

Приклад з обробкою помилки:

```js
async function login(page, email, password) {
  try {
    await page.goto('https://example.com/login');
    await page.fill('#email', email);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
  } catch (error) {
    console.error('Login failed:', error.message);
    await page.screenshot({ path: 'login-error.png' });
    throw error;
  }
}
```

## Команди проєкту

Встановлення залежностей:

```bash
npm install
```

Запуск перевірки ESLint, якщо буде додано відповідний script у `package.json`:

```bash
npm run lint
```

Запуск JavaScript-файлу в Node.js:

```bash
node src/index.js
```

## Best Practices

- Використовуйте `async / await` для кращої читабельності асинхронного коду.
- Завжди додавайте `await`, якщо далі потрібен реальний результат Promise.
- Обробляйте помилки на тому рівні, де є достатньо контексту для коректної реакції.
- Не приховуйте помилки порожнім `catch`; логування без `throw` може замаскувати проблему.
- Використовуйте `Promise.all` для незалежних паралельних операцій.
- Використовуйте `Promise.allSettled`, якщо потрібно отримати результат усіх операцій незалежно від помилок.
- Уникайте `async` callback всередині `forEach`; використовуйте `for...of` або `Promise.all`.
- Додавайте зрозумілі повідомлення до помилок, щоб stack trace було легше аналізувати.
- Для критичних сценаріїв додавайте скриншоти, логи або додаткові артефакти під час падіння тесту.
- Видаляйте тимчасові `console.log` та `debugger` перед фінальним комітом.
- Налаштовуйте ESLint і Prettier, щоб швидше знаходити помилки стилю та потенційні проблеми.
- Не робіть фіксовані очікування довшими без потреби; краще очікувати конкретний стан, подію або відповідь.
