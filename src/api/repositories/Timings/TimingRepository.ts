import { Timing } from '@api/models/Timings/Timing';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@EntityRepository(Timing)
export class TimingRepository extends RepositoryBase<Timing> {
    public async createTiming(data: object) {
        let entity = new Timing();

        Object.assign(entity, data);

        return await this.save(entity);
    }

    public async updateTiming(timing: Timing, data: object) {
        Object.assign(timing, data);

        return await timing.save(data);
    }
}
