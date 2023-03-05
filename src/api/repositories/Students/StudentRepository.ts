import { Student } from '@api/models/Students/Student';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { Course } from '@base/api/models/Courses/Course';
import { Slot } from '@base/api/models/Slots/Slot';

@EntityRepository(Student)
export class StudentRepository extends RepositoryBase<Student> {
    public async createStudent(data: object) {
        let entity = new Student();

        Object.assign(entity, data);

        return await this.save(entity);
    }

    public async updateStudent(student: Student, data: object) {
        Object.assign(student, data);

        return await student.save(data);
    }

    public async addCourse(student: Student, data: Course) {
        student.courses.push(data);

        return await student.save();
    }

    public async addSlot(student: Student, data: Slot) {
        student.slots.push(data);

        return await student.save();
    }
}
