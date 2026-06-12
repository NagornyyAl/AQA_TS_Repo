export interface IDescribable {
  getInfo(): string;
}

export interface IAudible {
  makeSound(): string;
}

export interface IFeedable {
  eat(): string;
}

export interface IMovable {
  move(): string;
}

export interface IBird extends IDescribable, IAudible, IFeedable, IMovable {}
