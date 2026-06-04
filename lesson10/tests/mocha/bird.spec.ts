import { expect } from 'chai';
import { Falcon } from '../../src/falcon';
import { Ostrich } from '../../src/ostrich';
import { FlyingStrategy, RunningStrategy } from '../../src/movement-strategy';

describe('Bird classes unit tests with Mocha', () => {
    describe('Falcon', () => {
        let falcon: Falcon;

        beforeEach(() => {
            falcon = new Falcon('Sapsan');
        });

        it('getName should return bird name', () => {
            expect(falcon.getName()).to.equal('Sapsan');
        });

        it('getInfo should return formatted bird info', () => {
            expect(falcon.getInfo()).to.equal('Name: Sapsan, Species: Falcon');
        });

        it('move should use flying strategy', () => {
            expect(falcon.move()).to.equal('Sapsan flies with max speed 320 km/h.');
        });
    });

    describe('Ostrich', () => {
        let ostrich: Ostrich;

        beforeEach(() => {
            ostrich = new Ostrich('Oscar');
        });

        it('getName should return bird name', () => {
            expect(ostrich.getName()).to.equal('Oscar');
        });

        it('getInfo should return formatted bird info', () => {
            expect(ostrich.getInfo()).to.equal('Name: Oscar, Species: Ostrich');
        });

        it('move should use running strategy', () => {
            expect(ostrich.move()).to.equal('Oscar runs with max speed 65 km/h.');
        });
    });

    describe('Movement strategies', () => {
        it('FlyingStrategy.move should return flying description', () => {
            const strategy = new FlyingStrategy(120);

            expect(strategy.move('Swift')).to.equal('Swift flies with max speed 120 km/h.');
        });

        it('RunningStrategy.move should return running description', () => {
            const strategy = new RunningStrategy(40);

            expect(strategy.move('Emu')).to.equal('Emu runs with max speed 40 km/h.');
        });
    });
});
