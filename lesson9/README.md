# ООП в TypeScript

## ООП. Що це?

**Об'єктно-орієнтоване програмування (ООП)** - це підхід до розробки програм, у якому система моделюється як набір об'єктів. Кожен об'єкт має:

- **стан** - дані, які описують об'єкт;
- **поведінку** - методи, які виконують дії;
- **відповідальність** - чітко визначену роль у програмі.

У TypeScript ООП реалізується через класи, інтерфейси, модифікатори доступу, наслідування, абстрактні класи та поліморфізм.

```ts
class User {
  constructor(
    public name: string,
    private password: string,
  ) {}

  sayHello(): string {
    return `Hello, ${this.name}`;
  }
}

const user = new User("Anna", "qwerty");
console.log(user.sayHello());
```

## ООП. Набір основних принципів

Основні принципи ООП:

- **інкапсуляція** - приховування внутрішньої реалізації об'єкта;
- **наслідування** - створення нових класів на основі вже існуючих;
- **абстрагування** - виділення важливих характеристик і приховування деталей;
- **поліморфізм** - можливість працювати з різними об'єктами через спільний інтерфейс.

Ці принципи допомагають писати код, який легше розширювати, тестувати та підтримувати.

## ООП. Навіщо?

ООП використовується для того, щоб:

- структурувати складну логіку;
- уникати дублювання коду;
- розділяти відповідальність між частинами програми;
- спростити підтримку й розширення проєкту;
- зробити код ближчим до реальних бізнес-сутностей;
- будувати зрозумілі тестові фреймворки, Page Object моделі та сервіси.

Наприклад, у тестуванні можна створити клас `LoginPage`, який містить усі локатори й методи для роботи зі сторінкою логіну.

## ООП. Основні поняття. Класи

**Клас** - це шаблон для створення об'єктів. Він описує, які властивості та методи матимуть об'єкти.

```ts
class Product {
  constructor(
    public title: string,
    public price: number,
  ) {}

  getInfo(): string {
    return `${this.title}: ${this.price} USD`;
  }
}
```

Клас сам по собі не є конкретним об'єктом. Він лише описує структуру майбутніх об'єктів.

## ООП. Основні поняття. Об'єкти

**Об'єкт** - це конкретний екземпляр класу.

```ts
const laptop = new Product("Laptop", 1200);
const phone = new Product("Phone", 800);

console.log(laptop.getInfo());
console.log(phone.getInfo());
```

Кожен об'єкт має власний стан, але використовує поведінку, описану в класі.

## ООП. Основні поняття. Методи

**Методи** - це функції, які належать класу або об'єкту. Вони описують поведінку об'єкта.

```ts
class Cart {
  private items: Product[] = [];

  addProduct(product: Product): void {
    this.items.push(product);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
```

Методи можуть змінювати стан об'єкта, повертати дані або виконувати певні дії.

## ООП. Основні поняття. Приховування інформації (інкапсуляція)

**Інкапсуляція** означає, що внутрішні деталі реалізації приховуються від зовнішнього коду. Для цього у TypeScript використовують модифікатори доступу:

- `public` - доступно всюди;
- `private` - доступно лише всередині класу;
- `protected` - доступно всередині класу та його нащадків;
- `readonly` - значення можна встановити лише під час ініціалізації.

```ts
class BankAccount {
  private balance = 0;

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}
```

Зовнішній код не може напряму змінити `balance`, тому клас контролює коректність операцій.

## ООП. Основні поняття. Успадкування (наслідування)

**Наслідування** дозволяє створити новий клас на основі існуючого. Дочірній клас отримує властивості й методи батьківського класу.

```ts
class Animal {
  constructor(public name: string) {}

  move(): string {
    return `${this.name} is moving`;
  }
}

class Dog extends Animal {
  bark(): string {
    return `${this.name} is barking`;
  }
}

const dog = new Dog("Rex");
console.log(dog.move());
console.log(dog.bark());
```

Наслідування корисне, коли між класами є реальний зв'язок "is-a": собака є твариною, автомобіль є транспортом.

## ООП. Основні поняття. Абстрагування

**Абстрагування** дозволяє описати загальний контракт без повної реалізації деталей. У TypeScript для цього використовують інтерфейси та абстрактні класи.

```ts
abstract class BasePage {
  constructor(protected url: string) {}

  abstract open(): Promise<void>;
}

class LoginPage extends BasePage {
  async open(): Promise<void> {
    console.log(`Open ${this.url}`);
  }
}
```

Абстрактний клас задає загальну структуру, а конкретний клас реалізує потрібну поведінку.

## ООП. Основні поняття. Поліморфізм

**Поліморфізм** означає, що різні класи можуть мати однаковий інтерфейс, але різну реалізацію.

```ts
interface Reporter {
  report(message: string): void;
}

class ConsoleReporter implements Reporter {
  report(message: string): void {
    console.log(message);
  }
}

class FileReporter implements Reporter {
  report(message: string): void {
    console.log(`Write to file: ${message}`);
  }
}

function sendReport(reporter: Reporter): void {
  reporter.report("Test completed");
}
```

Функція `sendReport` не знає, який саме клас отримала. Вона працює з будь-яким об'єктом, який відповідає інтерфейсу `Reporter`.

## ООП. Основні поняття. Відкрита рекурсія

**Відкрита рекурсія** - це властивість ООП, коли метод об'єкта викликає інший метод через `this`, і цей виклик може бути перевизначений у дочірньому класі.

```ts
class TestFlow {
  run(): void {
    this.beforeEach();
    console.log("Run test");
    this.afterEach();
  }

  protected beforeEach(): void {
    console.log("Default setup");
  }

  protected afterEach(): void {
    console.log("Default cleanup");
  }
}

class ApiTestFlow extends TestFlow {
  protected beforeEach(): void {
    console.log("Prepare API client");
  }
}

const flow = new ApiTestFlow();
flow.run();
```

Метод `run()` описаний у базовому класі, але викликає `beforeEach()` через `this`. Тому буде виконана версія методу з дочірнього класу.

## ООП. Принципи SOLID

**SOLID** - це набір з п'яти принципів проєктування, які допомагають створювати гнучкий, зрозумілий і підтримуваний код:

- **S** - Single Responsibility Principle;
- **O** - Open/Closed Principle;
- **L** - Liskov Substitution Principle;
- **I** - Interface Segregation Principle;
- **D** - Dependency Inversion Principle.

Ці принципи не є синтаксисом TypeScript. Це правила організації коду.

## ООП. Принципи SOLID. SRP

**Single Responsibility Principle** - принцип єдиної відповідальності.

Клас повинен мати лише одну причину для зміни. Тобто він має відповідати за одну чітку частину логіки.

Поганий приклад:

```ts
class UserService {
  createUser(): void {
    console.log("Create user");
  }

  sendEmail(): void {
    console.log("Send email");
  }

  writeLog(): void {
    console.log("Write log");
  }
}
```

Краще розділити відповідальності:

```ts
class UserService {
  createUser(): void {
    console.log("Create user");
  }
}

class EmailService {
  sendEmail(): void {
    console.log("Send email");
  }
}

class Logger {
  writeLog(): void {
    console.log("Write log");
  }
}
```

## ООП. Принципи SOLID. OCP

**Open/Closed Principle** - принцип відкритості/закритості.

Код має бути відкритим для розширення, але закритим для зміни. Нову поведінку краще додавати через нові класи або реалізації, а не через постійне редагування існуючого коду.

```ts
interface PaymentMethod {
  pay(amount: number): void;
}

class CardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pay ${amount} by card`);
  }
}

class PayPalPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pay ${amount} by PayPal`);
  }
}

class PaymentProcessor {
  process(paymentMethod: PaymentMethod, amount: number): void {
    paymentMethod.pay(amount);
  }
}
```

Щоб додати новий спосіб оплати, достатньо створити новий клас, який реалізує `PaymentMethod`.

## ООП. Принципи SOLID. LSP

**Liskov Substitution Principle** - принцип підстановки Лісков.

Об'єкти дочірнього класу повинні коректно замінювати об'єкти батьківського класу без порушення логіки програми.

```ts
class Bird {
  eat(): void {
    console.log("Bird is eating");
  }
}

class Sparrow extends Bird {
  fly(): void {
    console.log("Sparrow is flying");
  }
}

class Penguin extends Bird {
  swim(): void {
    console.log("Penguin is swimming");
  }
}
```

Якщо не всі птахи літають, не варто додавати метод `fly()` до базового класу `Bird`. Інакше частина дочірніх класів буде змушена реалізовувати некоректну поведінку.

## ООП. Принципи SOLID. ISP

**Interface Segregation Principle** - принцип розділення інтерфейсів.

Клас не повинен залежати від методів, які він не використовує. Краще створювати кілька маленьких інтерфейсів замість одного великого.

```ts
interface Clickable {
  click(): Promise<void>;
}

interface Fillable {
  fill(value: string): Promise<void>;
}

class ButtonElement implements Clickable {
  async click(): Promise<void> {
    console.log("Click button");
  }
}

class InputElement implements Clickable, Fillable {
  async click(): Promise<void> {
    console.log("Click input");
  }

  async fill(value: string): Promise<void> {
    console.log(`Fill input with ${value}`);
  }
}
```

Такі інтерфейси простіші для реалізації та тестування.

## ООП. Принципи SOLID. DIP

**Dependency Inversion Principle** - принцип інверсії залежностей.

Модулі високого рівня не повинні напряму залежати від модулів низького рівня. Обидва мають залежати від абстракцій.

```ts
interface TestLogger {
  log(message: string): void;
}

class ConsoleLogger implements TestLogger {
  log(message: string): void {
    console.log(message);
  }
}

class TestRunner {
  constructor(private logger: TestLogger) {}

  run(): void {
    this.logger.log("Run tests");
  }
}

const runner = new TestRunner(new ConsoleLogger());
runner.run();
```

`TestRunner` залежить не від конкретного `ConsoleLogger`, а від абстракції `TestLogger`. Це полегшує заміну логера в майбутньому.

## ООП. Принципи KISS

**KISS** - Keep It Simple, Stupid. Принцип означає: рішення має бути настільки простим, наскільки це можливо.

У контексті TypeScript це означає:

- не створювати зайві класи без потреби;
- не ускладнювати архітектуру там, де достатньо функції;
- давати класам і методам зрозумілі назви;
- уникати надто глибокого наслідування;
- писати код, який легко прочитати без додаткових пояснень.

Простий код легше підтримувати, тестувати й змінювати.

## ООП. Принципи DRY

**DRY** - Don't Repeat Yourself. Принцип означає: не дублюй одну й ту саму логіку в різних місцях.

Поганий приклад:

```ts
class LoginTest {
  async loginAsAdmin(): Promise<void> {
    console.log("Open login page");
    console.log("Fill admin credentials");
    console.log("Click login");
  }

  async loginAsUser(): Promise<void> {
    console.log("Open login page");
    console.log("Fill user credentials");
    console.log("Click login");
  }
}
```

Краще винести спільну логіку:

```ts
class LoginPage {
  async login(username: string, password: string): Promise<void> {
    console.log("Open login page");
    console.log(`Fill username: ${username}`);
    console.log(`Fill password: ${password}`);
    console.log("Click login");
  }
}
```

DRY не означає, що будь-яке схоже місце треба негайно об'єднувати. Важливо прибирати саме дублювання знань або бізнес-логіки.

## Використання ООП для структурування тестових сценаріїв

В автоматизації тестування ООП часто використовують для організації коду за відповідальностями.

Типова структура:

- **Page Object** - клас, який описує сторінку або компонент;
- **Service Object** - клас для роботи з API або бізнес-операціями;
- **Test Data Builder** - клас для створення тестових даних;
- **Base Class** - спільна логіка для кількох класів;
- **Interfaces** - контракти для однакової поведінки різних реалізацій.

Приклад Page Object:

```ts
class LoginPage {
  constructor(private page: Page) {}

  async open(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill("#email", email);
    await this.page.fill("#password", password);
    await this.page.click("button[type='submit']");
  }
}
```

Приклад тестового сценарію:

```ts
test("user can login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("user@example.com", "password123");

  await expect(page).toHaveURL("/dashboard");
});
```

Переваги такого підходу:

- тестові сценарії стають коротшими й зрозумілішими;
- локатори зберігаються в одному місці;
- зміни в UI менше впливають на всі тести;
- спільні дії можна повторно використовувати;
- код тестів легше підтримувати в команді.

## Best Practices

- Використовуйте ООП там, де воно реально спрощує структуру коду.
- Називайте класи іменниками: `LoginPage`, `UserService`, `PaymentProcessor`.
- Називайте методи дієсловами: `open()`, `login()`, `createUser()`, `sendReport()`.
- Тримайте класи сфокусованими на одній відповідальності.
- Надавайте перевагу композиції перед глибоким наслідуванням.
- Приховуйте внутрішній стан через `private` або `protected`.
- Не робіть усі властивості `public` за замовчуванням.
- Використовуйте інтерфейси для опису контрактів між частинами системи.
- Не створюйте абстракції наперед, якщо ще немає реальної потреби.
- Уникайте великих класів, які роблять усе одразу.
- Не змішуйте бізнес-логіку, роботу з UI, API й логування в одному класі.
- У тестах зберігайте локатори та дії зі сторінкою в Page Object класах.
- Пишіть методи так, щоб їх було легко читати в тесті як сценарій користувача.
- Дотримуйтеся принципів SOLID, KISS і DRY, але не перетворюйте їх на самоціль.
- Пам'ятайте, що хороший ООП-код має бути зрозумілим, розширюваним і простим для підтримки.
