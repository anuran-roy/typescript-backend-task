import { NotFoundError } from 'routing-controllers';

export class SlotNotFoundException extends NotFoundError {
    constructor() {
        super('Slot not found!');
    }
}
