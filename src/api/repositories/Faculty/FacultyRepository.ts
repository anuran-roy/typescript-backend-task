import { Faculty } from '@api/models/Faculty/Faculty';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@EntityRepository(Faculty)
export class FacultyRepository extends RepositoryBase<Faculty> {
    public async createFaculty(data: object) {
        let entity = new Faculty();

        Object.assign(entity, data);

        return await this.save(entity);
    }

    public async updateFaculty(faculty: Faculty, data: object) {
        Object.assign(faculty, data);

        return await faculty.save(data);
    }
}
