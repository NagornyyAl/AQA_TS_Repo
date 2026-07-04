type ProcessableItem = string | number;

export const processItemsArrow = (items: ProcessableItem[]): ProcessableItem => {
    let result: ProcessableItem = typeof items[0] === 'number' ? 0 : '';

    for (const item of items) {
        result = typeof result === 'number' && typeof item === 'number'
            ? result + item
            : `${result}${item}`;
    }

    return result;
};

export const processBothArrow = (numbers: number[], strings: string[]): string => {
    const sum = processItemsArrow(numbers);
    const text = processItemsArrow(strings);

    return `${sum} ${text}`;
};
