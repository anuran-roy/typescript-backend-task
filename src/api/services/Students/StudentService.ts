import { Service } from 'typedi';
import { StudentRepository } from '@api/repositories/Students/StudentRepository';
import { StudentNotFoundException } from '@api/exceptions/Students/StudentNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class StudentService {
    constructor(
        @InjectRepository() private studentRepository: StudentRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    ) {
        //
    }

    public async getAll(resourceOptions?: object) {
        return await this.studentRepository.getManyAndCount(resourceOptions);
    }

    public async findOneById(id: number, resourceOptions?: object) {
        return await this.getRequestedStudentOrFail(id, resourceOptions);
    }

    public async create(data: object) {
        let student = await this.studentRepository.createStudent(data);

        this.eventDispatcher.dispatch('onStudentCreate', student);

        return student;
    }

    public async updateOneById(id: number, data: object) {
        const student = await this.getRequestedStudentOrFail(id);

        return await this.studentRepository.updateStudent(student, data);
    }

    public async deleteOneById(id: number) {
        return await this.studentRepository.delete(id);
    }

    private async getRequestedStudentOrFail(id: number, resourceOptions?: object) {
        let student = await this.studentRepository.getOneById(id, resourceOptions);

        if (!student) {
            throw new StudentNotFoundException();
        }

        return student;
    }
}
