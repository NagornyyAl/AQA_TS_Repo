console.log('for: від 0 до 9');
for (let i = 0; i <= 9; i += 1) {
    console.log(i);
}

console.log('while: від 0 до 9');
let j = 0;
while (j <= 9) {
    console.log(j);
    j += 1;
}

console.log('do...while: від 0 до 9');
let k = 0;
do {
    console.log(k);
    k += 1;
} while (k <= 9);

console.log('for: від 100 до 0 з кроком 10');
for (let x = 100; x >= 0; x -= 10) {
    console.log(x);
}

console.log('while: від 100 до 0 з кроком 10');
let m = 100;
while (m >= 0) {
    console.log(m);
    m -= 10;
}

console.log('do...while: від 100 до 0 з кроком 10');
let n = 100;
do {
    console.log(n);
    n -= 10;
} while (n >= 0);
