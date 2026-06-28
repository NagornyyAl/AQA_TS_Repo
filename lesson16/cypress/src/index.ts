import { processBoth, processItems } from './functions';
import { processBothArrow, processItemsArrow } from './arrow-functions';

const numbers = [911.1026, 12.1, 871, 8, 103];
const strings = ['Hello, ', 'world!', ' This is ', 'TypeScript.'];

console.log('=== 1. Adding numbers ===');
console.log('Sum of numbers:', processItems(numbers));
console.log('Sum with arrow function:', processItemsArrow(numbers));
console.log('\n');

console.log('=== 2. Concatenating strings ===');
console.log('String result:', processItems(strings));
console.log('String result with arrow function:', processItemsArrow(strings));
console.log('\n');

console.log('=== 3. Processing both types ===');
console.log('Numbers and strings result:', processBoth(numbers, strings));
console.log('Numbers and strings result with arrow function:', processBothArrow(numbers, strings));
