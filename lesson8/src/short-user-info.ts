import { UserDto } from './user.dto';

export class ShortUserInfo {
    public id: number;
    public name: string;
    public city: string;
    public company: string;
    public contactsLength: number;

    public constructor(user: UserDto) {
        this.id = user.id;
        this.name = user.name;
        this.city = user.address.city;
        this.company = user.company.name;
        this.contactsLength = user.email.length + user.phone.length;
    }

    public getInfo(): string {
        return `${this.name} from ${this.city}, company: ${this.company}`;
    }
}
