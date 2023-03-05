import { NotFoundError } from 'routing-controllers';

export class FacultyNotFoundException extends NotFoundError {
    constructor() {
        super('Faculty not found!');
    }
}
