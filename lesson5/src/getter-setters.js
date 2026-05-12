export const person = {
    _firstName: 'Іван',
    _lastName: 'Шевченко',
    _age: 28,
    _address: {
        city: 'Київ',
        street: 'Хрещатик',
        building: 22
    },

    // Гетери
    get fullName() {
        return `${this._firstName} ${this._lastName}`;
    },

    get age() {
        return this._age;
    },

    get address() {
        return `${this._address.city}, ${this._address.street}, ${this._address.building}`;
    },

    // Сетери
    set fullName(name) {
        const [first, ...last] = name.trim().split(' ');
        if (first) this._firstName = first;
        if (last.length > 0) this._lastName = last.join(' ');
    },

    set age(newAge) {
        if (typeof newAge === 'number' && newAge > 0 && newAge < 150) {
            this._age = newAge;
        } else {
            console.warn('Некоректний вік');
        }
    },

    set city(newCity) {
        if (typeof newCity === 'string' && newCity.length > 1) {
            this._address.city = newCity;
        }
    },

    // Метод summary
    summary() {
        return `
Особиста інформація:
Ім'я: ${this.fullName}
Вік: ${this.age} років
Адреса: ${this.address}
        `.trim();
    },

    celebrateBirthday() {
        this._age += 1;
        return `З днем народження, ${this._firstName}! Тепер вам ${this._age} років.`;
    }
};
