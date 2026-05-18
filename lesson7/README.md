# Lesson 7: TypeScript Functions

Цей проєкт показує, як звичайний JavaScript-код можна переписати на TypeScript.
Головна ідея: TypeScript допомагає заздалегідь описати, які дані функція приймає і що вона повертає.

## Як запустити

У терміналі з папки `lesson7` виконай:

```powershell
npx tsx .\src\index.ts
```

Команда запускає файл `src/index.ts`. Саме він є головною точкою входу в програму.

## Що знаходиться в папці `src`

У папці `src` є три основні TypeScript-файли:

- `index.ts` - файл запуску програми.
- `functions.ts` - звичайні функції, оголошені через ключове слово `function`.
- `arrow-functions.ts` - такі самі дії, але написані через стрілкові функції `=>`.

## Файл `src/functions.ts`

Цей файл містить логіку для роботи з масивами. Тут є функції, які додають числа, склеюють рядки і можуть обробити обидва типи даних разом.

### Блок типу `ProcessableItemType`

```ts
type ProcessableItemType = 'number' | 'string';
```

Цей блок створює власний тип. Він означає: змінна з таким типом може мати тільки одне з двох значень - `'number'` або `'string'`.

Це потрібно для допоміжної функції `processArray`, щоб вона знала, які елементи шукати в масиві: числа або рядки.

### Блок overload-сигнатур `processArray`

```ts
function processArray(arr: unknown, itemType: 'number', initialValue: number): number;
function processArray(arr: unknown, itemType: 'string', initialValue: string): string;
```

Ці два рядки називаються overload-сигнатурами. Вони пояснюють TypeScript, що функція може працювати у двох режимах:

- якщо `itemType` дорівнює `'number'`, функція поверне `number`;
- якщо `itemType` дорівнює `'string'`, функція поверне `string`.

Це потрібно, щоб TypeScript точніше розумів результат функції.

### Блок реалізації `processArray`

```ts
function processArray(arr: unknown, itemType: ProcessableItemType, initialValue: number | string): number | string {
```

Це справжнє тіло функції, тобто місце, де написано, що саме вона робить.

Параметри:

- `arr: unknown` - дані невідомого типу. Ми не довіряємо їм одразу.
- `itemType: ProcessableItemType` - тип елементів, які треба обробляти: `'number'` або `'string'`.
- `initialValue: number | string` - початкове значення: `0` для чисел або `''` для рядків.

Повертає функція `number | string`, бо результат залежить від режиму роботи.

### Блок перевірки масиву

```ts
if (!Array.isArray(arr) || arr.length === 0) {
    return initialValue;
}
```

Цей блок перевіряє, чи справді в функцію передали масив.

Якщо це не масив або масив порожній, функція не намагається його обробляти і просто повертає початкове значення.

Це захищає програму від помилок.

### Блок обробки чисел

```ts
if (itemType === 'number') {
    let result = initialValue as number;

    for (const item of arr) {
        if (typeof item === 'number') {
            result += item;
        }
    }

    return result;
}
```

Цей блок виконується тільки тоді, коли треба працювати з числами.

Що тут відбувається:

- створюється змінна `result`;
- програма проходить по кожному елементу масиву;
- через `typeof item === 'number'` перевіряє, чи елемент є числом;
- якщо це число, додає його до `result`;
- у кінці повертає суму.

`as number` потрібен, щоб сказати TypeScript: у цьому блоці ми працюємо саме з числовим результатом.

### Блок обробки рядків

```ts
let result = initialValue as string;

for (const item of arr) {
    if (typeof item === 'string') {
        result += item;
    }
}

return result;
```

Цей блок виконується тоді, коли `itemType` не `'number'`, тобто коли треба працювати з рядками.

Що тут відбувається:

- створюється змінна `result`;
- програма проходить по масиву;
- перевіряє, чи елемент є рядком;
- якщо це рядок, додає його до загального тексту;
- у кінці повертає склеєний рядок.

### Блок `sumNumbers`

```ts
export function sumNumbers(arr: unknown): number {
    return processArray(arr, 'number', 0);
}
```

Це функція для додавання чисел.

Вона викликає `processArray` у числовому режимі:

- `'number'` означає, що треба шукати числа;
- `0` - початкове значення для суми;
- результат має тип `number`.

Слово `export` означає, що цю функцію можна імпортувати і використовувати в іншому файлі, наприклад в `index.ts`.

### Блок `concatStrings`

```ts
export function concatStrings(arr: unknown): string {
    return processArray(arr, 'string', '');
}
```

Це функція для склеювання рядків.

Вона викликає `processArray` у рядковому режимі:

- `'string'` означає, що треба шукати рядки;
- `''` - порожній рядок, з якого починається склеювання;
- результат має тип `string`.

### Блок `processBoth`

```ts
export function processBoth(numbers: unknown, strings: unknown): string {
    const sum = sumNumbers(numbers);
    const text = concatStrings(strings);

    return sum + ' ' + text;
}
```

Ця функція об'єднує дві дії:

- `sumNumbers(numbers)` рахує суму чисел;
- `concatStrings(strings)` склеює рядки;
- `return sum + ' ' + text` повертає один спільний рядок.

Результат має тип `string`, бо навіть число при додаванні до рядка перетворюється на текст.

## Файл `src/arrow-functions.ts`

Цей файл робить майже те саме, що й `functions.ts`, але функції записані через стрілковий синтаксис `=>`.

### Блок типу `ProcessableItemType`

```ts
type ProcessableItemType = 'number' | 'string';
```

Це такий самий тип, як у `functions.ts`. Він потрібен, щоб обмежити можливі значення для `itemType`.

Функція може працювати тільки з двома режимами: `'number'` або `'string'`.

### Блок інтерфейсу `ProcessArrayArrow`

```ts
interface ProcessArrayArrow {
    (arr: unknown, itemType: 'number', initialValue: number): number;
    (arr: unknown, itemType: 'string', initialValue: string): string;
}
```

Цей блок описує, як може викликатися стрілкова функція `processArrayArrow`.

Тут знову є два режими:

- якщо передали `'number'` і `0`, повернеться `number`;
- якщо передали `'string'` і `''`, повернеться `string`.

Це не просто прикраса. Без цього TypeScript бачив би результат як `number | string`, і було б складніше точно сказати, що `sumNumbersArrow` повертає саме число, а `concatStringsArrow` саме рядок.

### Блок створення `processArrayArrow`

```ts
const processArrayArrow = ((arr: unknown, itemType: ProcessableItemType, initialValue: number | string): number | string => {
```

Це стрілкова версія допоміжної функції.

Вона приймає:

- `arr` - дані, які треба перевірити;
- `itemType` - тип елементів для пошуку;
- `initialValue` - початкове значення.

Функція повертає або число, або рядок.

### Блок перевірки масиву

```ts
if (!Array.isArray(arr) || arr.length === 0) {
    return initialValue;
}
```

Цей блок такий самий за змістом, як у `functions.ts`.

Він потрібен, щоб не обробляти неправильні або порожні дані.

### Блок обробки чисел

```ts
if (itemType === 'number') {
    let result = initialValue as number;

    for (const item of arr) {
        if (typeof item === 'number') {
            result += item;
        }
    }

    return result;
}
```

Цей блок додає тільки ті елементи масиву, які справді є числами.

Якщо в масив випадково потрапить рядок або `true`, цей блок їх пропустить.

### Блок обробки рядків

```ts
let result = initialValue as string;

for (const item of arr) {
    if (typeof item === 'string') {
        result += item;
    }
}

return result;
```

Цей блок склеює тільки рядки.

Інші типи даних він не додає до результату.

### Блок `as ProcessArrayArrow`

```ts
}) as ProcessArrayArrow;
```

Цей блок говорить TypeScript: вважай `processArrayArrow` функцією з правилами, описаними в інтерфейсі `ProcessArrayArrow`.

Це потрібно через те, що стрілкові функції не мають такого самого зручного синтаксису overload, як звичайні функції через `function`.

### Блок `sumNumbersArrow`

```ts
export const sumNumbersArrow = (arr: unknown): number => {
    return processArrayArrow(arr, 'number', 0);
};
```

Це стрілкова функція для додавання чисел.

Вона викликає `processArrayArrow` у режимі `'number'`, тому результат має тип `number`.

### Блок `concatStringsArrow`

```ts
export const concatStringsArrow = (arr: unknown): string => {
    return processArrayArrow(arr, 'string', '');
};
```

Це стрілкова функція для склеювання рядків.

Вона викликає `processArrayArrow` у режимі `'string'`, тому результат має тип `string`.

### Блок `processBothArrow`

```ts
export const processBothArrow = (numbers: unknown, strings: unknown): string => {
    const sum = sumNumbersArrow(numbers);
    const text = concatStringsArrow(strings);

    return sum + ' ' + text;
};
```

Ця функція робить дві дії:

- рахує суму чисел;
- склеює рядки;
- повертає все як один рядок.

Це стрілкова версія функції `processBoth` з файлу `functions.ts`.

## Файл `src/index.ts`

Це виконуючий файл. Саме його ми запускаємо командою:

```powershell
npx tsx .\src\index.ts
```

### Блок імпортів

```ts
import { concatStrings, sumNumbers } from './functions';
import { concatStringsArrow, processBothArrow, sumNumbersArrow } from './arrow-functions';
```

Цей блок підключає функції з інших файлів.

Без імпортів `index.ts` не знав би, де взяти `sumNumbers`, `concatStrings`, `sumNumbersArrow`, `concatStringsArrow` і `processBothArrow`.

### Блок тестових даних

```ts
const numbers: number[] = [811.1026, 12.1, 871, 8, 103];
const strings: string[] = ['Hello, ', 'world!', ' This is ', 'TypeScript.'];
```

Тут створюються два масиви:

- `numbers` - масив чисел;
- `strings` - масив рядків.

`number[]` означає: у масиві мають бути тільки числа.

`string[]` означає: у масиві мають бути тільки рядки.

Ці масиви потрібні, щоб перевірити роботу функцій.

### Блок виводу результатів для чисел

```ts
console.log('=== 1. Adding numbers ===');
console.log('Sum of numbers:', sumNumbers(numbers));
console.log('Sum with arrow function:', sumNumbersArrow(numbers));
console.log('\n');
```

Цей блок виводить у консоль заголовок і результати додавання чисел.

Тут порівнюється робота двох функцій:

- `sumNumbers` з файлу `functions.ts`;
- `sumNumbersArrow` з файлу `arrow-functions.ts`.

Обидві мають повернути однакову суму.

### Блок виводу результатів для рядків

```ts
console.log('=== 2. Concatenating strings ===');
console.log('String result:', concatStrings(strings));
console.log('String result with arrow function:', concatStringsArrow(strings));
console.log('\n');
```

Цей блок виводить результат склеювання рядків.

Тут також порівнюються дві версії:

- звичайна функція `concatStrings`;
- стрілкова функція `concatStringsArrow`.

### Блок виводу результату для обох типів

```ts
console.log('=== 3. Processing both types ===');
console.log('Numbers and strings result:', processBothArrow(numbers, strings));
```

Цей блок показує, як можна обробити числа і рядки разом.

Функція `processBothArrow` спочатку рахує суму чисел, потім склеює рядки, а потім повертає один спільний результат.

## Що відбувається під час запуску

Коли ти запускаєш:

```powershell
npx tsx .\src\index.ts
```

відбувається така послідовність:

1. `npx` запускає пакет `tsx`.
2. `tsx` читає файл `src/index.ts`.
3. `tsx` розуміє TypeScript-код і запускає його без ручної компіляції в JavaScript.
4. `index.ts` імпортує функції з `functions.ts` та `arrow-functions.ts`.
5. Створюються масиви `numbers` і `strings`.
6. Викликаються функції для додавання чисел і склеювання рядків.
7. Результати виводяться в термінал.

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

## Для чого тут TypeScript

У JavaScript можна випадково передати не ті дані, наприклад рядок замість числа.
TypeScript допомагає побачити такі помилки раніше, ще до запуску програми.

Наприклад:

```ts
const numbers: number[] = [1, 2, 3];
```

Це означає, що в масиві `numbers` мають бути числа. Якщо спробувати додати туди текст, TypeScript покаже помилку.

Також у функціях явно написано, що вони повертають:

```ts
export function sumNumbers(arr: unknown): number
```

Це означає: функція `sumNumbers` повертає число.

```ts
export function concatStrings(arr: unknown): string
```

Це означає: функція `concatStrings` повертає рядок.

## BestPractice: Вступ до TypeScript. Типи даних в TypeScript

TypeScript - це JavaScript з типами. Він не замінює JavaScript, а додає до нього перевірку типів.

Основні типи:

- `number` - числа: `1`, `25`, `3.14`.
- `string` - текст: `'Hello'`, `'TypeScript'`.
- `boolean` - логічне значення: `true` або `false`.
- `number[]` - масив чисел: `[1, 2, 3]`.
- `string[]` - масив рядків: `['a', 'b', 'c']`.
- `unknown` - невідомий тип. Його треба перевірити перед використанням.
- `void` - функція нічого не повертає.

Кращі практики:

- Завжди вказуй типи для параметрів функцій.
- Вказуй тип, який функція повертає.
- Для назв типів використовуй PascalCase, наприклад `ProcessableItemType`.
- Не використовуй `any`, якщо можна використати точніший тип або `unknown`.
- Якщо дані можуть бути різними, спочатку перевір їх через `typeof`, `Array.isArray` або інші перевірки.
- Не дублюй однакову логіку: краще винести спільну частину в окрему допоміжну функцію.
- Називай змінні так, щоб було зрозуміло, що в них зберігається: `numbers`, `strings`, `result`.

Головне правило: типи потрібні не для ускладнення коду, а для того, щоб зробити код зрозумілішим і зменшити кількість помилок.
