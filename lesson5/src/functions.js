// functions.js

export function sumNumbers(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return 0;
    }

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'number') {
            sum = sum + arr[i];
        }
    }
    return sum;
}

export function concatStrings(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return '';
    }

    let result = '';
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'string') {
            result = result + arr[i];
        }
    }
    return result;
}

// Функція для обробки обох типів
export function processBoth(numbers, strings) {
    const sum = sumNumbers(numbers);
    const text = concatStrings(strings);
    return sum + ' ' + text;
}
