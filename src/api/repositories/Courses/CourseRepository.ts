import { Course } from '@api/models/Courses/Course';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@EntityRepository(Course)
export class CourseRepository extends RepositoryBase<Course> {
    public async createCourse(data: object) {
        let entity = new Course();

        Object.assign(entity, data);

        return await this.save(entity);
    }

    public async updateCourse(course: Course, data: object) {
        Object.assign(course, data);

        return await course.save(data);
    }
}
