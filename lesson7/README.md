# Lesson 7: TypeScript Functions

Проєкт показує, як переписати прості JavaScript-функції на TypeScript.
У TypeScript ми явно вказуємо, які дані функція приймає і який результат повертає.

## Як запустити

З папки `lesson7` виконай:

```powershell
npx tsx .\src\index.ts
```

Ця команда запускає файл `src/index.ts`.

## Що є в папці `src`

- `index.ts` - головний файл запуску.
- `functions.ts` - функції, написані через `function`.
- `arrow-functions.ts` - такі самі функції, але написані через стрілковий синтаксис `=>`.

## Файл `src/functions.ts`

### Блок `sumNumbers`

```ts
export function sumNumbers(numbers: number[]): number {
```

Це функція для додавання чисел.

- `numbers: number[]` означає, що функція приймає масив чисел.
- `: number` після дужок означає, що функція повертає число.
- `export` означає, що функцію можна використати в іншому файлі.

```ts
let sum = 0;
```

Тут створюється змінна, у якій буде зберігатися сума.

```ts
for (const number of numbers) {
    sum += number;
}
```

Цикл проходить по кожному числу в масиві і додає його до `sum`.

```ts
return sum;
```

Функція повертає готову суму.

### Блок `concatStrings`

```ts
export function concatStrings(strings: string[]): string {
```

Це функція для склеювання рядків.

- `strings: string[]` означає, що функція приймає масив рядків.
- `: string` означає, що функція повертає рядок.

```ts
let result = '';
```

Тут створюється порожній рядок. У нього поступово додається текст.

```ts
for (const text of strings) {
    result += text;
}
```

Цикл проходить по кожному рядку в масиві і додає його до `result`.

```ts
return result;
```

Функція повертає один склеєний рядок.

### Блок `processBoth`

```ts
export function processBoth(numbers: number[], strings: string[]): string {
```

Ця функція приймає два масиви:

- `numbers: number[]` - масив чисел;
- `strings: string[]` - масив рядків.

```ts
const sum = sumNumbers(numbers);
const text = concatStrings(strings);
```

Тут функція використовує дві попередні функції:

- `sumNumbers` рахує суму чисел;
- `concatStrings` склеює рядки.

```ts
return sum + ' ' + text;
```

Функція повертає один рядок: спочатку сума, потім пробіл, потім текст.

## Файл `src/arrow-functions.ts`

Цей файл робить те саме, що `functions.ts`, але через стрілкові функції.

### Блок `sumNumbersArrow`

```ts
export const sumNumbersArrow = (numbers: number[]): number => {
```

Це стрілкова функція для додавання чисел.

- `numbers: number[]` - вхідний масив чисел.
- `: number` - результат буде числом.
- `=>` показує, що це arrow function.

Всередині логіка така сама: створюється `sum`, цикл додає всі числа, потім функція повертає результат.

### Блок `concatStringsArrow`

```ts
export const concatStringsArrow = (strings: string[]): string => {
```

Це стрілкова функція для склеювання рядків.

- `strings: string[]` - вхідний масив рядків.
- `: string` - результат буде рядком.

Всередині створюється `result`, цикл додає до нього кожен рядок, а потім функція повертає готовий текст.

### Блок `processBothArrow`

```ts
export const processBothArrow = (numbers: number[], strings: string[]): string => {
```

Ця функція приймає масив чисел і масив рядків.

```ts
const sum = sumNumbersArrow(numbers);
const text = concatStringsArrow(strings);
```

Тут вона викликає дві інші arrow-функції.

```ts
return sum + ' ' + text;
```

Повертається один рядок із сумою і текстом.

## Файл `src/index.ts`

Це виконуючий файл. Саме він запускається командою:

```powershell
npx tsx .\src\index.ts
```

### Блок імпортів

```ts
import { concatStrings, sumNumbers } from './functions';
import { concatStringsArrow, processBothArrow, sumNumbersArrow } from './arrow-functions';
```

Цей блок підключає функції з інших файлів.

Без `import` файл `index.ts` не міг би використати функції з `functions.ts` та `arrow-functions.ts`.

### Блок даних

```ts
const numbers: number[] = [911.1026, 12.1, 871, 8, 103];
const strings: string[] = ['Hello, ', 'world!', ' This is ', 'TypeScript.'];
```

Тут створюються дані для перевірки функцій.

- `numbers` - масив чисел.
- `strings` - масив рядків.

TypeScript не дозволить випадково покласти рядок у `numbers` або число в `strings`.

### Блок додавання чисел

```ts
console.log('=== 1. Adding numbers ===');
console.log('Sum of numbers:', sumNumbers(numbers));
console.log('Sum with arrow function:', sumNumbersArrow(numbers));
```

Цей блок виводить у консоль суму чисел.

Він показує, що звичайна функція `sumNumbers` і стрілкова функція `sumNumbersArrow` дають однаковий результат.

### Блок склеювання рядків

```ts
console.log('=== 2. Concatenating strings ===');
console.log('String result:', concatStrings(strings));
console.log('String result with arrow function:', concatStringsArrow(strings));
```

Цей блок виводить у консоль склеєний текст.

Він порівнює звичайну функцію `concatStrings` і стрілкову функцію `concatStringsArrow`.

### Блок обробки двох типів даних

```ts
console.log('=== 3. Processing both types ===');
console.log('Numbers and strings result:', processBothArrow(numbers, strings));
```

Цей блок показує, як одна функція може використати і масив чисел, і масив рядків.

## Що відбувається під час запуску

Коли виконується команда:

```powershell
npx tsx .\src\index.ts
```

відбувається таке:

1. `npx` запускає пакет `tsx`.
2. `tsx` читає TypeScript-файл `src/index.ts`.
3. `index.ts` імпортує функції з інших файлів.
4. Створюються масиви `numbers` і `strings`.
5. Викликаються функції для додавання чисел і склеювання рядків.
6. Результати виводяться в термінал.

Очікуваний результат:

```text
=== 1. Adding numbers ===
Sum of numbers: 1805.2026
Sum with arrow function: 1805.2026


=== 2. Concatenating strings ===
String result: Hello, world! This is TypeScript.
String result with arrow function: Hello, world! This is TypeScript.


=== 3. Processing both types ===
Numbers and strings result: 1805.2026 Hello, world! This is TypeScript.
```

## BestPractice: Вступ до TypeScript. Типи даних в TypeScript

TypeScript - це JavaScript з типами. Він допомагає знайти частину помилок ще до запуску програми.

Основні типи:

- `number` - числа: `1`, `25`, `3.14`.
- `string` - текст: `'Hello'`, `'TypeScript'`.
- `boolean` - логічне значення: `true` або `false`.
- `number[]` - масив чисел: `[1, 2, 3]`.
- `string[]` - масив рядків: `['a', 'b', 'c']`.
- `unknown` - невідомий тип, який треба перевірити перед використанням.
- `void` - функція нічого не повертає.

Кращі практики:

- Вказуй типи для параметрів функцій.
- Вказуй тип, який функція повертає.
- Використовуй прості типи там, де цього достатньо.
- Не ускладнюй код helper-функціями, якщо задача проста.
- Не використовуй `any`, якщо можна написати точний тип.
- Називай змінні зрозуміло: `numbers`, `strings`, `sum`, `result`.

Головне правило: типи мають робити код зрозумілішим, а не складнішим.
