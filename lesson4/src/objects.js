const bankAccount = {
    ownerName: 'Тарас Шевченко',
    accountNumber: 'UA123456789000000000000000001',
    currency: 'UAH',
    balance: 25_750,
    bank: {
        name: 'Фінанс Банк',
        branch: {
            city: 'Київ',
            address: 'вулиця Хрещатик, 1'
        }
    },
    transactions: [
        { type: 'дохід', description: 'Зарплата', amount: 35_000 },
        { type: 'витрата', description: 'Оренда офісу', amount: 8_000 },
        { type: 'витрата', description: 'Оплата сервісів', amount: 1_250 }
    ],
    summary() {
        return `Власник рахунку ${this.ownerName} має рахунок ${this.accountNumber} у банку ${this.bank.name}. Відділення знаходиться за адресою: ${this.bank.branch.city}, ${this.bank.branch.address}. Поточний баланс: ${this.balance} ${this.currency}. Останні транзакції: ${this.transactions.map((transaction) => `${transaction.type} "${transaction.description}" на суму ${transaction.amount} ${this.currency}`).join(', ')}.`;
    }
};

console.log(bankAccount.summary());
