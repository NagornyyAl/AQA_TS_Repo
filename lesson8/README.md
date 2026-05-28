# Інтерфейси та типи. Класи

## Пояснення простими словами

Уяви, що ми будуємо місто з конструктора.

- `interface` - це інструкція, які деталі повинні бути в будиночку.
- `type` - це назва для певного виду деталей або правил.
- `class` - це форма, за якою можна зробити багато однакових або схожих іграшок.
- `object` - це вже готова іграшка, яку ми створили.

Наприклад, якщо ми хочемо зробити іграшкову машинку, нам потрібно домовитися, що в неї має бути:

- колір;
- кількість коліс;
- назва;
- вміння їхати.

Інтерфейс у TypeScript допомагає сказати: "Будь-яка машинка в нашій програмі повинна мати ось такі частини".

```ts
interface ToyCar {
  color: string;
  wheels: number;
  name: string;
}
```

Тепер TypeScript перевіряє, щоб ми не забули важливу деталь.

```ts
const car: ToyCar = {
  color: 'red',
  wheels: 4,
  name: 'Super Car',
};
```

Якщо забути `wheels`, TypeScript підкаже: "У машинки немає коліс". Це зручно, бо помилку видно ще до запуску програми.

## Що, як, навіщо і для чого використовується

### Інтерфейс простими словами

**Що це?**

Інтерфейс - це список правил для об'єкта. Він каже, які поля або дії повинні бути всередині.

**Як використовується?**

Ми спочатку описуємо правила, а потім створюємо об'єкт за цими правилами.

```ts
interface Dog {
  name: string;
  age: number;
}

const dog: Dog = {
  name: 'Bobik',
  age: 3,
};
```

**Навіщо?**

Щоб не забути важливі поля та не переплутати типи. Наприклад, `age` повинен бути числом, а не текстом.

**Для чого в тестах?**

Щоб тестові дані завжди мали правильну форму: логін був текстом, пароль був текстом, статус був числом.

### Тип простими словами

**Що це?**

`type` - це коротка назва для якогось правила або набору можливих значень.

```ts
type UserRole = 'admin' | 'user' | 'guest';
```

Це означає: роль користувача може бути тільки `admin`, `user` або `guest`.

**Як використовується?**

```ts
const role: UserRole = 'admin';
```

**Навіщо?**

Щоб не написати випадково неправильне слово, наприклад `superadmin`, якщо такої ролі немає.

**Для чого в тестах?**

Щоб тест перевіряв тільки дозволені значення: ролі, статуси, типи користувачів, назви сторінок.

### Клас простими словами

**Що це?**

Клас - це шаблон. Як формочка для печива: одна формочка може зробити багато печив однакової форми.

```ts
class Toy {
  constructor(public name: string) {}

  play(): void {
    console.log(`Play with ${this.name}`);
  }
}
```

**Як використовується?**

Ми створюємо об'єкт із класу через `new`.

```ts
const ball = new Toy('Ball');

ball.play();
```

**Навіщо?**

Щоб не писати один і той самий код багато разів. Один клас може створити багато об'єктів.

**Для чого в тестах?**

Класи часто використовують для сторінок сайту. Наприклад, `LoginPage` знає, як відкрити сторінку логіну, ввести логін, ввести пароль і натиснути кнопку.

```ts
class LoginPage {
  open(): void {
    console.log('Open login page');
  }

  login(username: string, password: string): void {
    console.log(`Login as ${username}`);
    console.log(`Password: ${password}`);
  }
}
```

### Наслідування простими словами

**Що це?**

Наслідування - це коли один клас бере можливості іншого класу.

Уяви, що є звичайна іграшка `Toy`, а є машинка `CarToy`. Машинка теж іграшка, але ще вміє їхати.

```ts
class SimpleToy {
  play(): void {
    console.log('Play');
  }
}

class CarToy extends SimpleToy {
  drive(): void {
    console.log('Drive');
  }
}
```

**Навіщо?**

Щоб не повторювати однаковий код у різних класах.

**Для чого в тестах?**

Можна зробити базовий клас `BasePage`, де є спільна дія `open()`, а потім створювати різні сторінки: `LoginPage`, `ProductPage`, `CartPage`.

### Модифікатори доступу простими словами

**Що це?**

Модифікатори доступу кажуть, хто може користуватися властивістю або методом.

- `public` - можна користуватися всім.
- `private` - можна користуватися тільки всередині класу.
- `protected` - можна користуватися всередині класу та його дітей.
- `readonly` - можна записати один раз, а потім не змінювати.

**Навіщо?**

Щоб важливі внутрішні речі не змінювали випадково ззовні.

### Статичні методи простими словами

**Що це?**

Статичний метод - це дія, яку можна викликати одразу з класу, без створення об'єкта.

```ts
class MathHelper {
  static add(a: number, b: number): number {
    return a + b;
  }
}

const result = MathHelper.add(2, 3);
```

**Навіщо?**

Для простих допоміжних дій, де не потрібно запам'ятовувати стан.

**Для чого в тестах?**

Наприклад, щоб швидко створити випадковий email, дату або ім'я користувача.

## Інтерфейси та класи в TS

TypeScript розширює JavaScript статичною типізацією. Завдяки цьому можна описувати структуру даних, контракт об'єктів, сигнатури функцій і поведінку класів ще до запуску коду.

Основні інструменти для цього:

- `interface` - описує форму об'єкта або контракт класу.
- `type` - створює псевдонім для типу, об'єднання, перетину або складнішої структури.
- `class` - описує шаблон для створення об'єктів із властивостями та методами.

У тестовій автоматизації це допомагає робити код передбачуваним: тестові дані мають зрозумілу структуру, Page Object класи мають стабільний контракт, а помилки в даних легше знаходити ще під час розробки.

## Інтерфейси. Що це?

Інтерфейс - це опис структури об'єкта. Він визначає, які властивості та методи повинен мати об'єкт, але не містить реалізації.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

const user: User = {
  id: 1,
  name: 'Olena',
  email: 'olena@example.com',
  isActive: true,
};
```

Інтерфейс існує тільки на етапі компіляції. У JavaScript після компіляції він не потрапляє.

## Інтерфейси. Доцільність використання

Інтерфейси варто використовувати, коли потрібно:

- описати структуру об'єкта;
- задати контракт для класу;
- типізувати параметри функцій;
- описати відповідь API;
- зробити тестові дані зрозумілими та перевикористовуваними;
- зменшити кількість помилок через неправильні назви полів або типи значень.

Приклад типізації параметра функції:

```ts
interface LoginCredentials {
  username: string;
  password: string;
}

function login(credentials: LoginCredentials): void {
  console.log(`Login as ${credentials.username}`);
}

login({
  username: 'qa_user',
  password: 'strongPassword123',
});
```

## Інтерфейси. Опис тестових даних

У тестах часто використовуються набори даних: користувачі, товари, замовлення, конфігурації, відповіді API. Інтерфейс дозволяє явно описати їхню структуру.

```ts
interface TestUser {
  username: string;
  password: string;
  role: 'admin' | 'user' | 'guest';
  expectedStatusCode: number;
}

const validUser: TestUser = {
  username: 'admin_user',
  password: 'Admin123!',
  role: 'admin',
  expectedStatusCode: 200,
};

const guestUser: TestUser = {
  username: 'guest_user',
  password: 'Guest123!',
  role: 'guest',
  expectedStatusCode: 403,
};
```

Такі описи корисні для data-driven тестів:

```ts
const users: TestUser[] = [
  {
    username: 'admin_user',
    password: 'Admin123!',
    role: 'admin',
    expectedStatusCode: 200,
  },
  {
    username: 'guest_user',
    password: 'Guest123!',
    role: 'guest',
    expectedStatusCode: 403,
  },
];
```

## Інтерфейси. Чому типізувати?

Типізація допомагає:

- знаходити помилки до запуску тестів;
- швидше працювати з автодоповненням у редакторі;
- робити код самодокументованим;
- безпечніше змінювати структуру даних;
- уникати випадкових помилок у назвах властивостей;
- легше підтримувати тестовий фреймворк у команді.

Приклад помилки, яку TypeScript знайде одразу:

```ts
interface Product {
  id: number;
  title: string;
  price: number;
}

const product: Product = {
  id: 10,
  title: 'Keyboard',
  price: '100', // Error: Type 'string' is not assignable to type 'number'
};
```

## Класи

Клас - це шаблон для створення об'єктів. Він може містити:

- властивості;
- конструктор;
- методи;
- модифікатори доступу;
- статичні властивості та методи;
- наслідування від інших класів;
- імплементацію інтерфейсів.

У QA Automation класи часто використовуються для Page Object, сервісів, API-клієнтів, генераторів тестових даних і helper-утиліт.

## Класи. Оголошення

Базовий приклад класу:

```ts
class UserAccount {
  username: string;
  email: string;

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }

  getInfo(): string {
    return `${this.username} (${this.email})`;
  }
}

const account = new UserAccount('qa_user', 'qa@example.com');

console.log(account.getInfo());
```

Скорочений запис через параметри конструктора:

```ts
class UserAccount {
  constructor(
    public username: string,
    public email: string,
  ) {}

  getInfo(): string {
    return `${this.username} (${this.email})`;
  }
}
```

## Класи. Наслідування

Наслідування дозволяє створити клас на основі іншого класу. Дочірній клас отримує властивості та методи батьківського класу.

```ts
class BasePage {
  constructor(public url: string) {}

  open(): void {
    console.log(`Open page: ${this.url}`);
  }
}

class LoginPage extends BasePage {
  fillUsername(username: string): void {
    console.log(`Fill username: ${username}`);
  }
}

const loginPage = new LoginPage('/login');

loginPage.open();
loginPage.fillUsername('qa_user');
```

## Класи. Наслідування. Розширення

Дочірній клас може не тільки використовувати можливості батьківського класу, а й розширювати їх власними властивостями та методами.

```ts
class ApiClient {
  constructor(protected baseUrl: string) {}

  get(endpoint: string): void {
    console.log(`GET ${this.baseUrl}${endpoint}`);
  }
}

class UserApiClient extends ApiClient {
  getUserById(id: number): void {
    this.get(`/users/${id}`);
  }
}

const userApiClient = new UserApiClient('https://api.example.com');

userApiClient.getUserById(1);
```

Якщо дочірній клас має власний конструктор, потрібно викликати `super()`.

```ts
class ProductPage extends BasePage {
  constructor(
    url: string,
    public productId: number,
  ) {
    super(url);
  }

  openProduct(): void {
    this.open();
    console.log(`Product id: ${this.productId}`);
  }
}
```

## Класи. Наслідування. Розширення абстрактного класу

Абстрактний клас не можна створити напряму через `new`. Він використовується як базовий клас для інших класів.

Абстрактні методи не мають реалізації в базовому класі. Дочірні класи повинні реалізувати їх самостійно.

```ts
abstract class TestReporter {
  constructor(protected reportName: string) {}

  abstract generate(): void;

  printReportName(): void {
    console.log(`Report: ${this.reportName}`);
  }
}

class HtmlReporter extends TestReporter {
  generate(): void {
    console.log('Generate HTML report');
  }
}

const reporter = new HtmlReporter('Regression tests');

reporter.printReportName();
reporter.generate();
```

## Класи. Наслідування. Імплементація інтерфейсу

Клас може реалізувати інтерфейс через ключове слово `implements`. У такому випадку клас зобов'язаний мати всі властивості та методи, описані в інтерфейсі.

```ts
interface AuthService {
  login(username: string, password: string): void;
  logout(): void;
}

class UiAuthService implements AuthService {
  login(username: string, password: string): void {
    console.log(`Login with username: ${username}`);
    console.log(`Use password: ${password}`);
  }

  logout(): void {
    console.log('Logout from application');
  }
}
```

Інтерфейс задає контракт, а клас відповідає за конкретну реалізацію.

## Класи. Модифікатори доступу

TypeScript має модифікатори доступу для властивостей і методів класу:

- `public` - доступний усюди. Це значення за замовчуванням.
- `private` - доступний тільки всередині поточного класу.
- `protected` - доступний всередині поточного класу та його дочірніх класів.
- `readonly` - значення можна встановити під час оголошення або в конструкторі, але потім не можна змінити.

```ts
class TestRun {
  public name: string;
  private status: string;
  protected retries: number;
  readonly id: number;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.status = 'created';
    this.retries = 0;
  }

  public start(): void {
    this.status = 'running';
  }

  private finish(): void {
    this.status = 'finished';
  }
}
```

Приклад `protected` у дочірньому класі:

```ts
class RetriedTestRun extends TestRun {
  increaseRetries(): void {
    this.retries += 1;
  }
}
```

## Класи. Статичні класи, властивості й методи

У TypeScript немає окремого поняття "статичний клас", як у деяких інших мовах. Але клас може мати статичні властивості та методи.

Статичні члени належать самому класу, а не конкретному об'єкту, створеному через `new`.

```ts
class TestConfig {
  static baseUrl = 'https://example.com';
  static timeout = 5000;

  static getLoginUrl(): string {
    return `${TestConfig.baseUrl}/login`;
  }
}

console.log(TestConfig.baseUrl);
console.log(TestConfig.getLoginUrl());
```

Статичні методи зручно використовувати для helper-логіки, яка не потребує стану конкретного екземпляра.

```ts
class RandomDataGenerator {
  static email(): string {
    return `user_${Date.now()}@example.com`;
  }

  static username(prefix: string): string {
    return `${prefix}_${Date.now()}`;
  }
}

const email = RandomDataGenerator.email();
const username = RandomDataGenerator.username('qa');
```

## Класи. Статичні класи, властивості й методи. Особливості використання

Статичні властивості та методи корисні, коли:

- дані або поведінка спільні для всього класу;
- не потрібно створювати об'єкт;
- метод виконує утилітарну дію;
- значення має бути доступне глобально в межах класу.

Але статичну логіку не варто використовувати для всього підряд. Якщо клас має стан, залежності або різні конфігурації для різних тестів, краще створювати екземпляри класу.

```ts
class DateHelper {
  static today(): string {
    return new Date().toISOString().split('T')[0];
  }
}

console.log(DateHelper.today());
```

## Interface vs Type

`interface` і `type` часто можуть описувати схожі речі, але між ними є різниця.

Приклад `interface`:

```ts
interface UserProfile {
  id: number;
  name: string;
}
```

Приклад `type`:

```ts
type UserRole = 'admin' | 'user' | 'guest';

type UserProfile = {
  id: number;
  name: string;
  role: UserRole;
};
```

Загальні рекомендації:

- `interface` зручно використовувати для опису об'єктів і контрактів класів.
- `type` зручно використовувати для union types, primitive aliases, tuples і складних композицій типів.

```ts
type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

type ApiResponse<T> = {
  status: StatusCode;
  data: T;
};
```

## Best Practices

- Типізуйте тестові дані, параметри функцій і відповіді API.
- Використовуйте `interface` для опису структури об'єктів і контрактів класів.
- Використовуйте `type` для union types, aliases і складних комбінацій типів.
- Не використовуйте `any`, якщо можна описати точний тип.
- Робіть необов'язкові поля явними через `?`.
- Використовуйте `readonly` для значень, які не повинні змінюватися.
- Тримайте класи сфокусованими на одній відповідальності.
- Не зловживайте наслідуванням. Якщо поведінка не має чіткої ієрархії, краще використати композицію.
- Використовуйте `private` і `protected`, щоб не відкривати внутрішню реалізацію класу.
- Статичні методи використовуйте для helper-логіки без стану.
- Для Page Object класів описуйте тільки дії та елементи конкретної сторінки.
- Для API-клієнтів виносьте спільну логіку в базові класи або сервіси.
- Називайте інтерфейси, типи та класи зрозуміло: `User`, `LoginCredentials`, `ApiResponse`, `BasePage`.
- Уникайте дублювання типів. Виносьте спільні структури в окремі інтерфейси або типи.
- Давайте TypeScript можливість перевіряти код до запуску тестів, а не виправляйте типові помилки вже під час виконання.
