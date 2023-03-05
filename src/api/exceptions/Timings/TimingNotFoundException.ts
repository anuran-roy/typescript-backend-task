import { NotFoundError } from 'routing-controllers';

export class TimingNotFoundException extends NotFoundError {
    constructor() {
        super('Timing not found!');
    }
}
