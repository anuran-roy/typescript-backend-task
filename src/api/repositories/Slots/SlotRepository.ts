import { Slot } from '@api/models/Slots/Slot';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@EntityRepository(Slot)
export class SlotRepository extends RepositoryBase<Slot> {
    public async createSlot(data: object) {
        let entity = new Slot();

        Object.assign(entity, data);

        return await this.save(entity);
    }

    public async updateSlot(slot: Slot, data: object) {
        Object.assign(slot, data);

        return await slot.save(data);
    }
}
