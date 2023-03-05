import { NotFoundError } from 'routing-controllers';

export class StudentNotFoundException extends NotFoundError {
    constructor() {
        super('Student not found!');
    }
}
