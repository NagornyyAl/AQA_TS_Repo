// arrow-functions.js

export const sumNumbersArrow = (arr) => {
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
};

export const concatStringsArrow = (arr) => {
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
};

export const processBothArrow = (numbers, strings) => {
    const sum = sumNumbersArrow(numbers);
    const text = concatStringsArrow(strings);
    return sum + ' ' + text;
};
