// arrow-functions.js

const processArrayArrow = (arr, itemType, initialValue) => {
    if (!Array.isArray(arr) || arr.length === 0) {
        return initialValue;
    }

    let result = initialValue;
    for (const item of arr) {
        if (typeof item === itemType) {
            result += item;
        }
    }
    return result;
};

export const sumNumbersArrow = (arr) => {
    return processArrayArrow(arr, 'number', 0);
};

export const concatStringsArrow = (arr) => {
    return processArrayArrow(arr, 'string', '');
};

export const processBothArrow = (numbers, strings) => {
    const sum = sumNumbersArrow(numbers);
    const text = concatStringsArrow(strings);
    return sum + ' ' + text;
};
