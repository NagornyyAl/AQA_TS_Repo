import { LessonGroup, Student, Teacher } from './abstraction';

interface GeoDto {
    lat: string;
    lng: string;
}

interface AddressDto {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoDto;
}

interface CompanyDto {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface UserDto {
    id: number;
    name: string;
    username: string;
    email: string;
    address: AddressDto;
    phone: string;
    website: string;
    company: CompanyDto;
}

class ShortUserInfo {
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

async function getUsers(): Promise<UserDto[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json() as UserDto[];
    return users;
}

function createShortUsers(users: UserDto[]): ShortUserInfo[] {
    return users.map((user) => new ShortUserInfo(user));
}

async function main(): Promise<void> {
    const users = await getUsers();
    console.log('Full first user:');
    console.log(users[0]);

    const shortUsers = createShortUsers(users);
    console.log('Short users:');
    console.log(shortUsers);
    console.log(shortUsers[0].getInfo());

    const student1 = new Student(1, 'Alex', 'QA Automation');
    const student2 = new Student(2, 'Olena', 'TypeScript');
    const teacher = new Teacher(1, 'Viacheslav', 'Programming');
    const group = new LessonGroup(teacher, [student1]);

    group.addStudent(student2);

    console.log(student1.sayHello());
    console.log(student1.study());
    console.log(teacher.getDescription());
    console.log(teacher.checkHomework(student1));
    console.log(group.getGroupInfo());
}

main().catch((error: unknown) => {
    console.error(error);
});
