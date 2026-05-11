const clientName = 'Іван Петренко';
const clientId = 'CLT-987654';
const transactionAmount = 12000;
const currency = 'UAH';
const isHighRiskClient = true;
const riskScore = 75;
const suspiciousKeywords = ['казино', 'крипто', 'mixer', 'біткоїн', 'ставки', 'відмив'];
const clientProfile = {
    age: 62,
    country: 'UA',
    pepStatus: false,
    lastTransactionDate: '2026-05-01'
};
const verificationStatus = undefined;
const transactionDescription = 'Переказ на курси';
// Перевіряємо, чи міститься хоча б одне підозріле слово в описі
const containsSuspiciousWord = suspiciousKeywords.some(keyword => {
    return transactionDescription.toLowerCase().includes(keyword.toLowerCase());
});

console.log('ПОРІВНЯННЯ:');
console.log('Сума > 100 000 UAH?', transactionAmount > 100000);
console.log('Сума < 50 000 UAH?', transactionAmount < 50000);
console.log('Ризик >= 70?', riskScore >= 70);
console.log('Високий ризик?', isHighRiskClient);
console.log('clientId === "CLT-987654"?', clientId === 'CLT-987654');
console.log('transactionAmount === "125000"?', transactionAmount === '125000');
console.log('Містить підозрілі ключові слова?', containsSuspiciousWord);
console.log('\n');
console.log('КОМБІНОВАНІ ПЕРЕВІРКИ:');

const isSuspicious = (transactionAmount > 100000) && (isHighRiskClient && !clientProfile.pepStatus) || containsSuspiciousWord;
console.log('Транзакція підозріла (велика сума + високий ризик)?', isSuspicious);
const needsManualReview = isSuspicious || riskScore >= 80;
console.log('Потрібна ручна перевірка?', needsManualReview);
const finalVerificationStatus = verificationStatus ?? 'Очікує перевірки';
console.log('Статус верифікації:', finalVerificationStatus);
console.log('Клієнт активний?', !!clientProfile.lastTransactionDate);
const shouldBlockTransaction = transactionAmount > 500000 || (isHighRiskClient && riskScore > 85);
console.log('Блокуємо транзакцію?', shouldBlockTransaction);

// ==================== ВИВЕДЕННЯ РЕЗУЛЬТАТІВ ====================

console.log('\n=== РЕЗУЛЬТАТ ПЕРЕВІРКИ ===');
console.log({
    client: clientName,
    amount: transactionAmount + ' ' + currency,
    riskLevel: riskScore,
    isSuspicious: isSuspicious,
    action: shouldBlockTransaction ? 'БЛОКУВАТИ' : 'ПРОПУСТИТИ З МОНІТОРИНГОМ'
});
