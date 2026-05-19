export function sumNumbers(numbers: number[]): number {
    let sum = 0;

    for (const number of numbers) {
        sum += number;
    }

    return sum;
}

export function concatStrings(strings: string[]): string {
    let result = '';

    for (const text of strings) {
        result += text;
    }

    return result;
}

export function processBoth(numbers: number[], strings: string[]): string {
    const sum = sumNumbers(numbers);
    const text = concatStrings(strings);

    return sum + ' ' + text;
}
