type ProcessableItemType = 'number' | 'string';

interface ProcessArrayArrow {
    (arr: unknown, itemType: 'number', initialValue: number): number;
    (arr: unknown, itemType: 'string', initialValue: string): string;
}

const processArrayArrow = ((arr: unknown, itemType: ProcessableItemType, initialValue: number | string): number | string => {
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
}) as ProcessArrayArrow;

export const sumNumbersArrow = (arr: unknown): number => {
    return processArrayArrow(arr, 'number', 0);
};

export const concatStringsArrow = (arr: unknown): string => {
    return processArrayArrow(arr, 'string', '');
};

export const processBothArrow = (numbers: unknown, strings: unknown): string => {
    const sum = sumNumbersArrow(numbers);
    const text = concatStringsArrow(strings);

    return sum + ' ' + text;
};
