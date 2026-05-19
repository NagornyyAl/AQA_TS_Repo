export const sumNumbersArrow = (numbers: number[]): number => {
    let sum = 0;

    for (const number of numbers) {
        sum += number;
    }

    return sum;
};

export const concatStringsArrow = (strings: string[]): string => {
    let result = '';

    for (const text of strings) {
        result += text;
    }

    return result;
};

export const processBothArrow = (numbers: number[], strings: string[]): string => {
    const sum = sumNumbersArrow(numbers);
    const text = concatStringsArrow(strings);

    // Повертаємо суму чисел і склеєний текст одним рядком.
    return sum + ' ' + text;
};
