import { Service } from 'typedi';
import { CourseRepository } from '@api/repositories/Courses/CourseRepository';
import { CourseNotFoundException } from '@api/exceptions/Courses/CourseNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class CourseService {
    constructor(
        @InjectRepository() private courseRepository: CourseRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    ) {
        //
    }

    public async getAll(resourceOptions?: object) {
        return await this.courseRepository.getManyAndCount(resourceOptions);
    }

    public async findOneById(id: number, resourceOptions?: object) {
        return await this.getRequestedCourseOrFail(id, resourceOptions);
    }

    public async create(data: object) {
        let course = await this.courseRepository.createCourse(data);

        this.eventDispatcher.dispatch('onCourseCreate', course);

        return course;
    }

    public async updateOneById(id: number, data: object) {
        const course = await this.getRequestedCourseOrFail(id);

        return await this.courseRepository.updateCourse(course, data);
    }

    public async deleteOneById(id: number) {
        return await this.courseRepository.delete(id);
    }

    private async getRequestedCourseOrFail(id: number, resourceOptions?: object) {
        let course = await this.courseRepository.getOneById(id, resourceOptions);

        if (!course) {
            throw new CourseNotFoundException();
        }

        return course;
    }
}
