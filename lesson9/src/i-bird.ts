export interface IDescribable {
    getInfo(): string;
}

export interface IAudible {
    makeSound(): void;
}

export interface IFeedable {
    eat(): void;
}

export interface IMovable {
    move(): string;
}

export interface IBird extends IDescribable, IAudible, IFeedable, IMovable {}
