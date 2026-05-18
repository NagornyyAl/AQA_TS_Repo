type ProcessableItemType = 'number' | 'string';

function processArray(arr: unknown, itemType: 'number', initialValue: number): number;
function processArray(arr: unknown, itemType: 'string', initialValue: string): string;
function processArray(arr: unknown, itemType: ProcessableItemType, initialValue: number | string): number | string {
    if (!Array.isArray(arr) || arr.length === 0) {
        return initialValue;
    }

    if (itemType === 'number') {
        let result = initialValue as number;

        for (const item of arr) {
            if (typeof item === 'number') {
                result += item;
            }
        }

        return result;
    }

    let result = initialValue as string;

    for (const item of arr) {
        if (typeof item === 'string') {
            result += item;
        }
    }

    return result;
}

export function sumNumbers(arr: unknown): number {
    return processArray(arr, 'number', 0);
}

export function concatStrings(arr: unknown): string {
    return processArray(arr, 'string', '');
}

export function processBoth(numbers: unknown, strings: unknown): string {
    const sum = sumNumbers(numbers);
    const text = concatStrings(strings);

    return sum + ' ' + text;
}
