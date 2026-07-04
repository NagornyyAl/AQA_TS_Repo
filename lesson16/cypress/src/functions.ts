type ProcessableItem = string | number;

export function processItems(items: ProcessableItem[]): ProcessableItem {
    let result: ProcessableItem = typeof items[0] === 'number' ? 0 : '';

    for (const item of items) {
        result = typeof result === 'number' && typeof item === 'number'
            ? result + item
            : `${result}${item}`;
    }

    return result;
}

export function processBoth(numbers: number[], strings: string[]): string {
    const sum = processItems(numbers);
    const text = processItems(strings);

    return `${sum} ${text}`;
}
