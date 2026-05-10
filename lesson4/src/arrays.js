const stringArray = ['яблуко', 'банан', 'апельсин', 'виноград'];
const numberArray = [10, 20, 30, 40];
const booleanArray = [true, false, true, false];
const anyArray = ['текст', 25, true, null];

console.log('Масив рядків. Перебір forEach():');
stringArray.forEach((item) => {
    console.log(item);
});

const stringMap = stringArray.map((item) => item.toUpperCase());
console.log('Масив рядків. map():', stringMap);

const stringReduce = stringArray.reduce((result, item) => `${result} ${item}`);
console.log('Масив рядків. reduce():', stringReduce);

const stringSort = [...stringArray].sort();
console.log('Масив рядків. sort():', stringSort);

const stringFilter = stringArray.filter((item) => item.length > 5);
console.log('Масив рядків. filter():', stringFilter);

const stringFind = stringArray.find((item) => item === 'апельсин');
console.log('Масив рядків. find():', stringFind);

const stringIndex = stringArray.indexOf('банан');
console.log('Масив рядків. indexOf():', stringIndex);

const stringConcat = stringArray.concat(['диня', 'ківі']);
console.log('Масив рядків. concat():', stringConcat);

const stringGroupBy = Object.groupBy(stringArray, (item) => item.length);
console.log('Масив рядків. groupBy() за довжиною:', stringGroupBy);

console.log('Масив чисел. Перебір forEach():');
numberArray.forEach((item) => {
    console.log(item);
});

const numberMap = numberArray.map((item) => item * 2);
console.log('Масив чисел. map():', numberMap);

const numberReduce = numberArray.reduce((sum, item) => sum + item, 0);
console.log('Масив чисел. reduce():', numberReduce);

const numberSort = [...numberArray].sort((a, b) => b - a);
console.log('Масив чисел. sort():', numberSort);

const numberFilter = numberArray.filter((item) => item >= 20);
console.log('Масив чисел. filter():', numberFilter);

const numberFind = numberArray.find((item) => item === 30);
console.log('Масив чисел. find():', numberFind);

const numberIndex = numberArray.indexOf(20);
console.log('Масив чисел. indexOf():', numberIndex);

const numberConcat = numberArray.concat([50, 60]);
console.log('Масив чисел. concat():', numberConcat);

const numberGroupBy = Object.groupBy(numberArray, (item) =>
    item >= 30 ? '30 і більше' : 'менше ніж 30'
);
console.log('Масив чисел. groupBy():', numberGroupBy);

console.log('Масив boolean. Перебір forEach():');
booleanArray.forEach((item) => {
    console.log(item);
});

const booleanMap = booleanArray.map((item) => !item);
console.log('Масив boolean. map():', booleanMap);

const booleanReduce = booleanArray.reduce(
    (count, item) => (item ? count + 1 : count),
    0
);
console.log('Масив boolean. reduce():', booleanReduce);

const booleanSort = [...booleanArray].sort((a, b) => Number(a) - Number(b));
console.log('Масив boolean. sort():', booleanSort);

const booleanFilter = booleanArray.filter((item) => item);
console.log('Масив boolean. filter():', booleanFilter);

const booleanFind = booleanArray.find((item) => item === false);
console.log('Масив boolean. find():', booleanFind);

const booleanIndex = booleanArray.indexOf(false);
console.log('Масив boolean. indexOf():', booleanIndex);

const booleanConcat = booleanArray.concat([true, true]);
console.log('Масив boolean. concat():', booleanConcat);

const booleanGroupBy = Object.groupBy(booleanArray, (item) =>
    item ? 'значення true' : 'значення false'
);
console.log('Масив boolean. groupBy():', booleanGroupBy);

console.log('Масив any. Перебір forEach():');
anyArray.forEach((item) => {
    console.log(item);
});

const anyMap = anyArray.map((item) => typeof item);
console.log('Масив any. map():', anyMap);

const anyReduce = anyArray.reduce(
    (result, item) => `${result} ${String(item)}`,
    'Значення:'
);
console.log('Масив any. reduce():', anyReduce);

const anySort = [...anyArray].sort((a, b) =>
    String(a).localeCompare(String(b))
);
console.log('Масив any. sort():', anySort);

const anyFilter = anyArray.filter((item) => typeof item === 'string');
console.log('Масив any. filter():', anyFilter);

const anyFind = anyArray.find((item) => typeof item === 'boolean');
console.log('Масив any. find():', anyFind);

const anyIndex = anyArray.indexOf(true);
console.log('Масив any. indexOf():', anyIndex);

const anyConcat = anyArray.concat(['додатково', 100]);
console.log('Масив any. concat():', anyConcat);

const anyGroupBy = Object.groupBy(anyArray, (item) => typeof item);
console.log('Масив any. groupBy() за типом:', anyGroupBy);
