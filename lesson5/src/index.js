// index.js
import { sumNumbers, concatStrings } from './functions.js';
import { sumNumbersArrow, concatStringsArrow, processBothArrow } from './arrow-functions.js';
import { person } from './getter-setters.js';

const numbers = [211.1026, 12.1, 871, 8, 103];
const strings = ['Привіт, ', 'світ!', ' Це ', 'JavaScript.'];

console.log('=== 1. Додавання чисел ===');
console.log('Сума чисел:', sumNumbers(numbers));
console.log('Сума (стрілкова):', sumNumbersArrow(numbers));
console.log('\n');
console.log('=== 2. Конкатенація рядків ===');
console.log('Результат рядків:', concatStrings(strings));
console.log('Результат рядків (стрілкова):', concatStringsArrow(strings));
console.log('\n');
console.log('=== 3. Обробка обох типів ===');
console.log('Сума чисел и рядків:', processBothArrow(numbers, strings));
console.log('\n');
console.log('=== Гетери / Сетери ===');
console.log('\n', '=== Початкові дані ===');
console.log(person.fullName);
console.log(person.summary());
console.log('\n', '=== Оновлення та підміна даних ===');
person.fullName = 'Марія Коваленко';
person.age = 32;
person.city = 'Одеса';

console.log(person.summary());
