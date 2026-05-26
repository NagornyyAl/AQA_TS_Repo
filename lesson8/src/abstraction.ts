export abstract class Person {
    public constructor(
        public id: number,
        public name: string
    ) {}

    public abstract getDescription(): string;

    public sayHello(): string {
        return `Hello, my name is ${this.name}`;
    }
}

export class Student extends Person {
    public constructor(
        id: number,
        name: string,
        public courseName: string
    ) {
        super(id, name);
    }

    public getDescription(): string {
        return `Student ${this.name} studies ${this.courseName}`;
    }

    public study(): string {
        return `${this.name} is studying ${this.courseName}`;
    }
}

export class Teacher extends Person {
    public constructor(
        id: number,
        name: string,
        public subject: string
    ) {
        super(id, name);
    }

    public getDescription(): string {
        return `Teacher ${this.name} teaches ${this.subject}`;
    }

    public checkHomework(student: Student): string {
        return `${this.name} checks homework of ${student.name}`;
    }
}

export class LessonGroup {
    public constructor(
        public teacher: Teacher,
        public students: Student[]
    ) {}

    public addStudent(student: Student): void {
        this.students.push(student);
    }

    public getGroupInfo(): string {
        const studentNames = this.students.map((student) => student.name).join(', ');
        return `${this.teacher.name} teaches students: ${studentNames}`;
    }
}
