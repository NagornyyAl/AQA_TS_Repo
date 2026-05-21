# Lesson 7: TypeScript Functions

Проєкт показує, як переписати JavaScript-код на TypeScript і використати union types.
Головна ідея: одна функція може працювати і з числами, і з рядками, якщо правильно описати типи.

## Як запустити

З папки `lesson7` виконай:

```powershell
npx tsx .\src\index.ts
```

## Що є в папці `src`

- `index.ts` - файл запуску.
- `functions.ts` - функції через `function`.
- `arrow-functions.ts` - такі самі дії через arrow functions.

## Файл `src/functions.ts`

### Блок union type

```ts
type ProcessableItem = string | number;
```

Цей тип означає: значення може бути або рядком, або числом.

Це потрібно, щоб одна функція могла приймати масив з елементами типу `string` або `number`.

### Блок `processItems`

```ts
export function processItems(items: ProcessableItem[]): ProcessableItem {
```

Це одна універсальна функція.

- `items: ProcessableItem[]` означає масив, у якому можуть бути числа або рядки.
- `: ProcessableItem` означає, що результатом буде або число, або рядок.
- `export` дозволяє використати функцію в `index.ts`.

```ts
let result: ProcessableItem = typeof items[0] === 'number' ? 0 : '';
```

Тут створюється початковий результат.

- якщо перший елемент масиву число, починаємо з `0`;
- якщо перший елемент рядок або масив порожній, починаємо з `''`.

```ts
for (const item of items) {
```

Цикл проходить по кожному елементу масиву.

```ts
result = typeof result === 'number' && typeof item === 'number'
    ? result + item
    : `${result}${item}`;
```

Тут головна логіка:

- якщо і поточний результат, і новий елемент є числами, вони додаються як числа;
- інакше значення склеюються як рядки.

Тобто функція поводиться схоже на JavaScript-оператор `+`.

```ts
return result;
```

Функція повертає фінальний результат.

### Блок `processBoth`

```ts
export function processBoth(numbers: number[], strings: string[]): string {
```

Ця функція приймає окремо масив чисел і масив рядків.

```ts
const sum = processItems(numbers);
const text = processItems(strings);
```

Тут одна й та сама функція `processItems` використовується двічі:

- для чисел;
- для рядків.

```ts
return `${sum} ${text}`;
```

Результат повертається одним рядком.

## Файл `src/arrow-functions.ts`

Цей файл повторює ту саму логіку, але через стрілкові функції.

### Блок union type

```ts
type ProcessableItem = string | number;
```

Це такий самий union type: елемент може бути або `string`, або `number`.

### Блок `processItemsArrow`

```ts
export const processItemsArrow = (items: ProcessableItem[]): ProcessableItem => {
```

Це arrow function, яка робить те саме, що `processItems`.

Вона приймає масив чисел або рядків і повертає число або рядок.

### Блок `processBothArrow`

```ts
export const processBothArrow = (numbers: number[], strings: string[]): string => {
```

Це arrow-версія функції `processBoth`.

Всередині вона викликає `processItemsArrow` для чисел і для рядків, а потім повертає спільний текстовий результат.

## Файл `src/index.ts`

### Блок імпортів

```ts
import { processBoth, processItems } from './functions';
import { processBothArrow, processItemsArrow } from './arrow-functions';
```

Тут підключаються функції з інших файлів.

### Блок даних

```ts
const numbers = [911.1026, 12.1, 871, 8, 103];
const strings = ['Hello, ', 'world!', ' This is ', 'TypeScript.'];
```

Тут немає явної типізації `number[]` або `string[]`, бо TypeScript сам бачить типи з присвоєних значень.

Для `numbers` він виведе тип `number[]`.
Для `strings` він виведе тип `string[]`.

Явну типізацію варто додавати тоді, коли:

- тип не очевидний з присвоєного значення;
- змінна створюється порожньою;
- у змінній планується зберігати різні типи;
- треба спеціально обмежити або розширити тип.

### Блок додавання чисел

```ts
console.log('Sum of numbers:', processItems(numbers));
console.log('Sum with arrow function:', processItemsArrow(numbers));
```

Тут одна універсальна функція обробляє масив чисел.

### Блок склеювання рядків

```ts
console.log('String result:', processItems(strings));
console.log('String result with arrow function:', processItemsArrow(strings));
```

Тут та сама універсальна функція обробляє масив рядків.

### Блок обробки двох масивів

```ts
console.log('Numbers and strings result:', processBoth(numbers, strings));
console.log('Numbers and strings result with arrow function:', processBothArrow(numbers, strings));
```

Тут показано використання звичайної функції і arrow-функції для двох масивів разом.

## Що відбувається під час запуску

Коли виконується команда:

```powershell
npx tsx .\src\index.ts
```

відбувається таке:

1. `npx` запускає `tsx`.
2. `tsx` читає `src/index.ts`.
3. `index.ts` імпортує функції з `functions.ts` та `arrow-functions.ts`.
4. Створюються масиви `numbers` і `strings`.
5. `processItems` обробляє масив чисел.
6. `processItems` обробляє масив рядків.
7. Результати виводяться в термінал.

Очікуваний результат:

```text
=== 1. Adding numbers ===
Sum of numbers: 1905.2026
Sum with arrow function: 1905.2026


=== 2. Concatenating strings ===
String result: Hello, world! This is TypeScript.
String result with arrow function: Hello, world! This is TypeScript.


=== 3. Processing both types ===
Numbers and strings result: 1905.2026 Hello, world! This is TypeScript.
Numbers and strings result with arrow function: 1905.2026 Hello, world! This is TypeScript.
```

## BestPractice: Вступ до TypeScript. Типи даних в TypeScript

TypeScript - це JavaScript з типами. Він допомагає побачити частину помилок до запуску програми.

Основні типи:

- `number` - числа: `1`, `25`, `3.14`.
- `string` - текст: `'Hello'`, `'TypeScript'`.
- `boolean` - логічне значення: `true` або `false`.
- `number[]` - масив чисел.
- `string[]` - масив рядків.
- `string | number` - union type: значення може бути рядком або числом.
- `(string | number)[]` - масив, у якому елементи можуть бути рядками або числами.

Кращі практики:

- Типізуй параметри функцій.
- Типізуй результат функції.
- Не дублюй дві функції, якщо одну задачу можна чисто описати через union type.
- Не додавай явну типізацію змінної, якщо TypeScript вже очевидно виводить правильний тип.
- Додавай явну типізацію, коли тип не очевидний або має бути ширшим за присвоєне значення.
- Не використовуй `any`, якщо можна описати тип точніше.
