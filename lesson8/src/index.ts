import { LessonGroup, Student, Teacher } from './abstraction';
import { createShortUsers, getUsers } from './users';

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
