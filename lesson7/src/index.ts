import { concatStrings, sumNumbers } from './functions';
import { concatStringsArrow, processBothArrow, sumNumbersArrow } from './arrow-functions';

const numbers: number[] = [811.1026, 12.1, 871, 8, 103];
const strings: string[] = ['Hello, ', 'world!', ' This is ', 'TypeScript.'];

console.log('=== 1. Adding numbers ===');
console.log('Sum of numbers:', sumNumbers(numbers));
console.log('Sum with arrow function:', sumNumbersArrow(numbers));
console.log('\n');

console.log('=== 2. Concatenating strings ===');
console.log('String result:', concatStrings(strings));
console.log('String result with arrow function:', concatStringsArrow(strings));
console.log('\n');

console.log('=== 3. Processing both types ===');
console.log('Numbers and strings result:', processBothArrow(numbers, strings));
