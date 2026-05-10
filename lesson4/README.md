# Lesson 4. Цикли. Масиви та об'єкти JS

## Мета уроку

На цьому уроці розглядаються базові інструменти JavaScript для роботи з повторюваними діями та структурами даних:

- цикли `for`, `while`, `do...while`, `for...of`, `for...in`;
- масиви та основні методи роботи з ними;
- об'єкти, властивості та методи;
- вкладені масиви й об'єкти;
- практичні приклади, які часто використовуються в автоматизації тестування.

---

## Цикли

Цикл дозволяє виконати один і той самий блок коду кілька разів.

### `for`

Використовується, коли кількість повторень відома заздалегідь.

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

Структура циклу:

- `let i = 0` - початкове значення лічильника;
- `i < 5` - умова виконання циклу;
- `i++` - зміна лічильника після кожної ітерації.

### `while`

Виконує код, поки умова залишається істинною.

```javascript
let count = 0;

while (count < 3) {
  console.log(count);
  count++;
}
```

### `do...while`

Спочатку виконує блок коду, а потім перевіряє умову. Такий цикл виконається хоча б один раз.

```javascript
let number = 5;

do {
  console.log(number);
  number++;
} while (number < 5);
```

### `for...of`

Використовується для перебору значень масиву або іншої ітерованої структури.

```javascript
const browsers = ['Chrome', 'Firefox', 'Safari'];

for (const browser of browsers) {
  console.log(browser);
}
```

### `for...in`

Використовується для перебору ключів об'єкта.

```javascript
const user = {
  name: 'Anna',
  role: 'QA Engineer',
  isActive: true
};

for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}
```

### `break` і `continue`

`break` повністю зупиняє виконання циклу.

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break;
  }

  console.log(i);
}
```

`continue` пропускає поточну ітерацію та переходить до наступної.

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }

  console.log(i);
}
```

---

## Масиви

Масив - це впорядкована колекція значень.

```javascript
const numbers = [10, 20, 30, 40];
const users = ['Anna', 'Petro', 'Olena'];
```

Індексація в масивах починається з `0`.

```javascript
const languages = ['JavaScript', 'TypeScript', 'Python'];

console.log(languages[0]); // JavaScript
console.log(languages[2]); // Python
```

### Основні властивості та методи масивів

| Метод / властивість | Опис | Приклад |
| --- | --- | --- |
| `length` | Кількість елементів | `users.length` |
| `push()` | Додає елемент у кінець | `users.push('Ivan')` |
| `pop()` | Видаляє останній елемент | `users.pop()` |
| `shift()` | Видаляє перший елемент | `users.shift()` |
| `unshift()` | Додає елемент на початок | `users.unshift('Maria')` |
| `includes()` | Перевіряє наявність елемента | `users.includes('Anna')` |
| `indexOf()` | Повертає індекс елемента | `users.indexOf('Petro')` |
| `join()` | Об'єднує елементи в рядок | `users.join(', ')` |

### Приклад роботи з масивом

```javascript
const testStatuses = ['passed', 'failed', 'skipped'];

testStatuses.push('blocked');

console.log(testStatuses.length);
console.log(testStatuses.includes('failed'));
```

---

## Методи перебору масивів

### `forEach()`

Виконує дію для кожного елемента масиву.

```javascript
const testCases = ['Login test', 'Checkout test', 'Search test'];

testCases.forEach((testCase) => {
  console.log(`Running: ${testCase}`);
});
```

### `map()`

Створює новий масив на основі існуючого.

```javascript
const prices = [100, 200, 300];
const pricesWithTax = prices.map((price) => price * 1.2);

console.log(pricesWithTax);
```

### `filter()`

Створює новий масив тільки з елементів, які відповідають умові.

```javascript
const results = ['passed', 'failed', 'passed', 'skipped'];
const failedResults = results.filter((result) => result === 'failed');

console.log(failedResults);
```

### `find()`

Повертає перший елемент, який відповідає умові.

```javascript
const users = ['Anna', 'Petro', 'Olena'];
const foundUser = users.find((user) => user === 'Petro');

console.log(foundUser);
```

### `some()` і `every()`

`some()` перевіряє, чи хоча б один елемент відповідає умові.

```javascript
const results = ['passed', 'passed', 'failed'];
const hasFailedTests = results.some((result) => result === 'failed');

console.log(hasFailedTests);
```

`every()` перевіряє, чи всі елементи відповідають умові.

```javascript
const results = ['passed', 'passed', 'passed'];
const allTestsPassed = results.every((result) => result === 'passed');

console.log(allTestsPassed);
```

### `reduce()`

Використовується для зведення масиву до одного значення.

```javascript
const durations = [120, 80, 200];
const totalDuration = durations.reduce((sum, duration) => sum + duration, 0);

console.log(totalDuration);
```

---

## Об'єкти

Об'єкт - це структура даних, яка зберігає пари `ключ: значення`.

```javascript
const user = {
  firstName: 'Anna',
  lastName: 'Ivanova',
  age: 28,
  isAdmin: false
};
```

### Доступ до властивостей

```javascript
console.log(user.firstName);
console.log(user['lastName']);
```

Крапкова нотація зручна для звичайних назв властивостей. Квадратні дужки корисні, коли назва властивості зберігається у змінній.

```javascript
const fieldName = 'age';

console.log(user[fieldName]);
```

### Додавання, зміна та видалення властивостей

```javascript
const testRun = {
  name: 'Regression',
  status: 'in progress'
};

testRun.environment = 'staging';
testRun.status = 'passed';

delete testRun.environment;

console.log(testRun);
```

### Методи об'єкта

Метод - це функція, яка зберігається у властивості об'єкта.

```javascript
const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

console.log(calculator.add(5, 3));
```

### `Object.keys()`, `Object.values()`, `Object.entries()`

```javascript
const user = {
  name: 'Anna',
  role: 'QA Engineer',
  city: 'Kyiv'
};

console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));
```

---

## Масиви об'єктів

У реальних задачах часто використовуються масиви, які містять об'єкти.

```javascript
const testCases = [
  {
    id: 1,
    title: 'User can log in',
    status: 'passed'
  },
  {
    id: 2,
    title: 'User can reset password',
    status: 'failed'
  },
  {
    id: 3,
    title: 'User can search products',
    status: 'passed'
  }
];
```

### Пошук невдалих тестів

```javascript
const failedTests = testCases.filter((testCase) => testCase.status === 'failed');

console.log(failedTests);
```

### Отримання назв тестів

```javascript
const testTitles = testCases.map((testCase) => testCase.title);

console.log(testTitles);
```

### Перевірка, чи всі тести пройшли

```javascript
const allPassed = testCases.every((testCase) => testCase.status === 'passed');

console.log(allPassed);
```

---

## Вкладені об'єкти

Об'єкти можуть містити інші об'єкти та масиви.

```javascript
const project = {
  name: 'Web Store',
  environment: {
    baseUrl: 'https://example.com',
    browser: 'Chrome'
  },
  testSuites: ['smoke', 'regression', 'api']
};

console.log(project.environment.baseUrl);
console.log(project.testSuites[1]);
```

---

## Best Practices

1. Використовувати `const` для масивів та об'єктів, якщо змінна не перевизначається.
2. Використовувати `for...of` для читабельного перебору значень масиву.
3. Використовувати методи `map()`, `filter()`, `find()`, `some()`, `every()` для роботи з масивами, коли це робить код простішим.
4. Не змінювати масиви без потреби, якщо можна створити новий масив.
5. Називати змінні так, щоб було зрозуміло, що саме вони зберігають.
6. Уникати надто глибокої вкладеності об'єктів.
7. Для перевірок використовувати строгу рівність `===`.
8. Дотримуватися правил ESLint і форматування проєкту.
