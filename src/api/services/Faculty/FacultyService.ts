import { Service } from 'typedi';
import { FacultyRepository } from '@api/repositories/Faculty/FacultyRepository';
import { FacultyNotFoundException } from '@api/exceptions/Faculty/FacultyNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class FacultyService {
    constructor(
        @InjectRepository() private facultyRepository: FacultyRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    ) {
        //
    }

    public async getAll(resourceOptions?: object) {
        return await this.facultyRepository.getManyAndCount(resourceOptions);
    }

    public async findOneById(id: number, resourceOptions?: object) {
        return await this.getRequestedFacultyOrFail(id, resourceOptions);
    }

    public async create(data: object) {
        let faculty = await this.facultyRepository.createFaculty(data);

        this.eventDispatcher.dispatch('onFacultyCreate', faculty);

        return faculty;
    }

    public async updateOneById(id: number, data: object) {
        const faculty = await this.getRequestedFacultyOrFail(id);

        return await this.facultyRepository.updateFaculty(faculty, data);
    }

    public async deleteOneById(id: number) {
        return await this.facultyRepository.delete(id);
    }

    private async getRequestedFacultyOrFail(id: number, resourceOptions?: object) {
        let faculty = await this.facultyRepository.getOneById(id, resourceOptions);

        if (!faculty) {
            throw new FacultyNotFoundException();
        }

        return faculty;
    }
}
