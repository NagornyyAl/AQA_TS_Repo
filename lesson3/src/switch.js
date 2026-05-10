const dayNumber = 4;

switch (dayNumber) {
    case 1:
        console.log('Понеділок: Лекція 1.');
        break;
    case 2:
        console.log('Вівторок: Вивчення теорії та прикладів.');
        break;
    case 3:
        console.log('Середа: працювати над практичними завданнями.');
        break;
    case 4:
        console.log('Четвер: Лекція 2.');
        break;
    case 5:
        console.log('П’ятниця: завершити домашнє завдання.');
        break;
    case 6:
    case 7:
        console.log('Вихідні: планування тижня, відпочинок і практика.');
        break;
    default:
        console.log('Невідомий номер дня.');
}

const operation = 'subtract';
const firstValue = 6;
const secondValue = 8;

switch (operation) {
    case 'add':
        console.log('Результат:', firstValue + secondValue);
        break;
    case 'subtract':
        console.log('Результат:', firstValue - secondValue);
        break;
    case 'multiply':
        console.log('Результат:', firstValue * secondValue);
        break;
    case 'divide':
        console.log('Результат:', firstValue / secondValue);
        break;
    default:
        console.log('Невідома операція.');
}
