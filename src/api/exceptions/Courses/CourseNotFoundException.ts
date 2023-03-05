import { NotFoundError } from 'routing-controllers';

export class CourseNotFoundException extends NotFoundError {
    constructor() {
        super('Course not found!');
    }
}
