import { Falcon } from './falcon';
import { Ostrich } from './ostrich';
import { IBird } from './i-bird';

function showBirdInfo(bird: IBird): void {
    console.log(bird.getInfo());
    bird.eat();
    bird.makeSound();
    console.log(bird.move());
}

const falcon = new Falcon('Sapsan');
const ostrich = new Ostrich('Oscar');

showBirdInfo(falcon);
showBirdInfo(ostrich);
