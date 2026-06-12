import { IBird } from './i-bird.js';

export type OutputWriter = (message: string) => void;

export function showBirdInfo(bird: IBird, output: OutputWriter = console.log): string[] {
  const messages = [bird.getInfo(), bird.eat(), bird.makeSound(), bird.move()];

  messages.forEach((message) => {
    output(message);
  });

  return messages;
}
