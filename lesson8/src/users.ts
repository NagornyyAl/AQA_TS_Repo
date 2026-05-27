import { ShortUserInfo } from './short-user-info';
import { UserDto } from './user.dto';

export async function getUsers(): Promise<UserDto[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json() as UserDto[];
    return users;
}

export function createShortUsers(users: UserDto[]): ShortUserInfo[] {
    return users.map((user) => new ShortUserInfo(user));
}
