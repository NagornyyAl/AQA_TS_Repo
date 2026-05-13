// functions.js

function processArray(arr, itemType, initialValue) {
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
}

export function sumNumbers(arr) {
    return processArray(arr, 'number', 0);
}

export function concatStrings(arr) {
    return processArray(arr, 'string', '');
}

// Функція для обробки обох типів
export function processBoth(numbers, strings) {
    const sum = sumNumbers(numbers);
    const text = concatStrings(strings);
    return sum + ' ' + text;
}
