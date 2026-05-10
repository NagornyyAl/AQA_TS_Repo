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

const containsSuspiciousWord = suspiciousKeywords.some(keyword => {
    return transactionDescription.toLowerCase().includes(keyword.toLowerCase());
});
const isVerified = verificationStatus === 'Верифікований';
const isLargeTransaction = transactionAmount > 100000;
const isMediumTransaction = transactionAmount >= 10000 && transactionAmount <= 100000;
const isSeniorClient = clientProfile.age >= 60;
const isKnownClient = clientId === 'CLT-987654' && clientProfile.country === 'UA';

if (isKnownClient && !!clientProfile.lastTransactionDate) {
    console.log(`${clientName} є активним відомим клієнтом.`);
}

if (isLargeTransaction && (isHighRiskClient || clientProfile.pepStatus || containsSuspiciousWord)) {
    console.log(`Рішення: заблокувати транзакцію на суму ${transactionAmount} ${currency}.`);
} else if (isMediumTransaction && riskScore >= 70 && !isVerified) {
    console.log('Рішення: передати транзакцію на ручну перевірку.');
} else if (isSeniorClient && isHighRiskClient && riskScore > 60) {
    console.log('Рішення: запросити додаткову верифікацію клієнта.');
} else if (!containsSuspiciousWord && riskScore < 80) {
    console.log('Рішення: дозволити транзакцію з моніторингом.');
} else {
    console.log('Рішення: дозволити транзакцію.');
}
