# Функції імпорту та експорту в JavaScript

## Що таке import/export?

`export` та `import` використовуються для розділення коду на окремі файли (модулі).

Це дозволяє:
- підтримувати чисту структуру проєкту;
- повторно використовувати код;
- уникати дублювання;
- простіше масштабувати застосунок.

---

# Export — експорт даних з файлу

Є 2 основних типи експорту:

1. Named Export (іменований експорт)
2. Default Export (експорт за замовчуванням)

---

# 1. Named Export

## Експорт змінної

### math.js

```js
export const pi = 3.14;
```

---

## Експорт функції

```js
export function add(a, b) {
    return a + b;
}
```

---

## Експорт кількох елементів

```js
const name = "Alex";

function hello() {
    console.log("Hello");
}

export { name, hello };
```

---

# Import Named Export

## Імпорт конкретних елементів

```js
import { pi, add } from "./math.js";

console.log(pi);
console.log(add(2, 3));
```

---

## Імпорт з перейменуванням

```js
import { add as sum } from "./math.js";

console.log(sum(5, 5));
```

---

# 2. Default Export

У файлі може бути лише ОДИН `default export`.

---

## Export default функції

### logger.js

```js
export default function log(message) {
    console.log(message);
}
```

---

# Import Default Export

```js
import log from "./logger.js";

log("Hello");
```

> Для `default export` фігурні дужки НЕ потрібні.

---

# Named + Default разом

### tools.js

```js
export const version = "1.0";

export function test() {
    console.log("Test");
}

export default function start() {
    console.log("Start");
}
```

---

## Імпорт

```js
import start, { version, test } from "./tools.js";

start();
test();

console.log(version);
```

---

# Імпорт ВСЬОГО модуля

```js
import * as math from "./math.js";

console.log(math.pi);
console.log(math.add(2, 2));
```

---

# Важливість "./"

```js
import test from "./test.js";
```

- `./` → поточна папка
- `../` → папка вище

---

# Часті помилки

## Забули type="module"

Для браузера:

```html
<script type="module" src="app.js"></script>
```

---

## Неправильний шлях

```js
import test from "test.js";
```

Правильно:

```js
import test from "./test.js";
```

---

## Default import у фігурних дужках

```js
import { log } from "./logger.js";
```

Правильно:

```js
import log from "./logger.js";
```

---

# Приклад структури проєкту

```text
project/
│
├── app.js
├── math.js
└── logger.js
```

---

# Повний приклад

## math.js

```js
export function add(a, b) {
    return a + b;
}

export function sub(a, b) {
    return a - b;
}
```

---

## app.js

```js
import { add, sub } from "./math.js";

console.log(add(10, 5));
console.log(sub(10, 5));
```

---

# Динамічний import()

Дозволяє завантажувати модулі під час виконання.

```js
const module = await import("./math.js");

console.log(module.add(2, 2));
```

---

# Функціональні вирази (Function Expressions)

У JavaScript функцію можна створити двома основними способами:

1. Function Declaration
2. Function Expression

---

# Function Declaration

```js
function sayHello() {
    console.log("Hello");
}
```

Особливість:
- функція піднімається (hoisting);
- її можна викликати ДО оголошення.

```js
sayHello();

function sayHello() {
    console.log("Hello");
}
```

---

# Function Expression

Функція зберігається у змінній.

```js
const sayHello = function () {
    console.log("Hello");
};
```

---

# Особливість

Function Expression НЕ піднімається повністю.

```js
sayHello(); // помилка

const sayHello = function () {
    console.log("Hello");
};
```

---

# Arrow Function

Сучасний скорочений запис.

```js
const add = (a, b) => {
    return a + b;
};
```

---

## Скорочений запис

```js
const add = (a, b) => a + b;
```

---

# Де використовуються Function Expressions

---

# Callback-функції

Дуже часто використовуються в:
- `setTimeout`
- `map`
- `filter`
- `forEach`
- `addEventListener`

---

## setTimeout

```js
setTimeout(function () {
    console.log("Hello");
}, 1000);
```

---

## Arrow version

```js
setTimeout(() => {
    console.log("Hello");
}, 1000);
```

---

# Масиви

```js
const numbers = [1, 2, 3];

const doubled = numbers.map(function (num) {
    return num * 2;
});
```

---

## Сучасний варіант

```js
const doubled = numbers.map(num => num * 2);
```

---

# Event Listener

```js
button.addEventListener("click", function () {
    console.log("Clicked");
});
```

---

## Arrow version

```js
button.addEventListener("click", () => {
    console.log("Clicked");
});
```

---

# Важливо знати про this

Arrow functions НЕ мають власного `this`.

---

## Звичайна функція

```js
const user = {
    name: "Alex",

    hello: function () {
        console.log(this.name);
    }
};
```

---

## Поганий варіант

```js
const user = {
    name: "Alex",

    hello: () => {
        console.log(this.name);
    }
};
```

У стрілкової функції `this` буде неправильним.

---

# Best Practice

## Використовуй const

```js
const test = () => {};
```

Чому:
- функцію не можна випадково перевизначити;
- код безпечніший.

---

## Для коротких callback — Arrow Function

Добре:

```js
numbers.map(num => num * 2);
```

---

## Для методів об’єктів — звичайні функції

Добре:

```js
const user = {
    hello() {
        console.log(this);
    }
};
```

---

## Не використовуй function без потреби

Старий стиль:

```js
const add = function(a, b) {
    return a + b;
};
```

Сучасний стиль:

```js
const add = (a, b) => a + b;
```

---

## Іменуй функції зрозуміло

Погано:

```js
const x = () => {};
```

Добре:

```js
const calculateTotalPrice = () => {};
```

---

## Одна функція — одна задача

Погано:

```js
function processUserDataAndSendEmailAndSaveToDB() {}
```

Добре:

```js
function processUserData() {}
function sendEmail() {}
function saveToDB() {}
```

---

## Чисті функції (Pure Functions)

Функція не повинна:
- змінювати зовнішні дані;
- мати побічні ефекти.

Добре:

```js
const add = (a, b) => a + b;
```

Погано:

```js
let total = 0;

function add(num) {
    total += num;
}
```

---

## Мінімізуй вкладеність

Погано:

```js
if (user) {
    if (user.isAdmin) {
        if (user.active) {
            console.log("OK");
        }
    }
}
```

Краще:

```js
if (!user || !user.isAdmin || !user.active) {
    return;
}

console.log("OK");
```

---

## Коли що використовувати

| Ситуація | Рекомендація |
|---|---|
| Метод об’єкта | `function` |
| Callback | `=>` |
| Коротка функція | `=>` |
| Потрібен власний `this` | `function` |
| map/filter/forEach | `=>` |
| Конструктор | `function` або `class` |

---

# Підсумок

- `export` → віддає код з файлу
- `import` → підключає код в інший файл
- Function Expression = функція в змінній
- Arrow Function = сучасний компактний запис
- Для callback → `=>`
- Для методів об’єкта → звичайна функція
- модулі = чистий та масштабований код
- пиши маленькі та зрозумілі функції
# Best Practice

## Import / Export

### Використовуй Named Export для більшості модулів

Добре:

```js
export function add() {}
export function remove() {}
```

Чому:
- легше знаходити імпорти;
- IDE краще підтримує автодоповнення;
- простіше рефакторити.

---

### Default Export — лише коли є один головний експорт

Добре:

```js
export default class UserService {}
```

Погано:

```js
export default function a() {}
```

Без зрозумілої назви важче підтримувати код.

---

### Завжди використовуй зрозумілі назви файлів

Добре:

```js
import UserService from "./UserService.js";
```

Погано:

```js
import x from "./a.js";
```

---

### Не імпортуй усе без потреби

Погано:

```js
import * as utils from "./utils.js";
```

Краще:

```js
import { formatDate } from "./utils.js";
```

Чому:
- чистіший код;
- менше зайвих залежностей;
- легше tree-shaking.

---

### Групуй імпорти

Добре:

```js
import fs from "fs";

import { add } from "./math.js";
import { log } from "./logger.js";
```

---

### Завжди використовуй розширення файлу у browser ESM

Добре:

```js
import test from "./test.js";
```

---

### Один модуль — одна відповідальність

Погано:

```js
utils.js
```

де:
- API
- UI
- validation
- database

в одному файлі.

Краще:
- `api.js`
- `validators.js`
- `dom.js`

---

# Function Declaration

### Використовуй для великих або основних функцій

Добре:

```js
function calculateTotal() {}
```

Чому:
- читабельніше;
- краще для основної логіки.

---

### Не зловживай hoisting

Погано:

```js
start();

function start() {}
```

Краще:

```js
function start() {}

start();
```

---

### Назви функцій повинні описувати дію

Добре:

```js
function fetchUsers() {}
```

Погано:

```js
function data() {}
```

---

# Function Expression

### Використовуй const

Добре:

```js
const login = function () {};
```

Погано:

```js
let login = function () {};
```

---

### Використовуй Function Expression для callback та локальної логіки

Добре:

```js
button.addEventListener("click", function () {});
```

---

### Не створюй анонімні функції без потреби

Погано:

```js
setTimeout(function () {}, 1000);
```

Краще:

```js
const handleTimeout = function () {};

setTimeout(handleTimeout, 1000);
```

Чому:
- легше дебажити;
- кращі stack trace.

---

# Arrow Function

### Використовуй для коротких функцій

Добре:

```js
const sum = (a, b) => a + b;
```

---

### Ідеально для map/filter/reduce

Добре:

```js
const activeUsers = users.filter(user => user.active);
```

---

### Не використовуй Arrow Function як метод об’єкта

Погано:

```js
const user = {
    name: "Alex",
    hello: () => {
        console.log(this.name);
    }
};
```

Краще:

```js
const user = {
    name: "Alex",
    hello() {
        console.log(this.name);
    }
};
```

---

### Не роби надто складні однорядкові функції

Погано:

```js
const result = arr.map(x => x.a ? x.b ? x.c : x.d : x.e);
```

Краще:

```js
const result = arr.map(item => {
    if (item.a) {
        return item.b ? item.c : item.d;
    }

    return item.e;
});
```

---

# Callback Functions

### Винось складні callback у окремі функції

Погано:

```js
users.map(user => {
    // 40 рядків логіки
});
```

Краще:

```js
const mapUser = user => {
    // логіка
};

users.map(mapUser);
```

---

### Не роби глибоку вкладеність callback

Погано:

```js
setTimeout(() => {
    fetchData(() => {
        saveData(() => {
            console.log("done");
        });
    });
});
```

Краще:
- async/await
- Promise

---

# this

### Для методів об’єкта використовуй звичайні функції

Добре:

```js
const cart = {
    total() {
        return this.price;
    }
};
```

---

### Arrow Function використовуй для збереження зовнішнього this

Добре:

```js
class App {
    start() {
        setTimeout(() => {
            console.log(this);
        }, 1000);
    }
}
```

---

# Загальні Best Practice

### Одна функція — одна задача

Добре:

```js
function validateUser() {}
function saveUser() {}
```

---

### Уникай функцій на 100+ рядків

Якщо функція дуже велика:
- розбий її;
- створи helper functions.

---

### Мінімізуй побічні ефекти

Добре:

```js
const add = (a, b) => a + b;
```

Погано:

```js
let total = 0;

function add(num) {
    total += num;
}
```

---

### Використовуй ранній return

Погано:

```js
if (user) {
    if (user.active) {
        return true;
    }
}
```

Краще:

```js
if (!user || !user.active) {
    return false;
}

return true;
```

---

### Не використовуй магічні числа

Погано:

```js
if (age > 18) {}
```

Краще:

```js
const ADULT_AGE = 18;

if (age > ADULT_AGE) {}
```

---

### Пиши передбачуваний код

Код повинен:
- легко читатись;
- легко тестуватись;
- легко рефакторитись.

---

### Дотримуйся єдиного стилю

Наприклад:
- всюди arrow functions;
- однакові відступи;
- однаковий неймінг.

---

### Використовуй ESLint + Prettier

Це:
- автоматично форматує код;
- знаходить помилки;
- підтримує єдиний стиль коду.