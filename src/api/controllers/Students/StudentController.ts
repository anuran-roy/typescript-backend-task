import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { StudentService } from '@api/services/Students/StudentService';
import { CourseService } from '@api/services/Courses/CourseService';
import { Service } from 'typedi';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import { AuthCheck, StudentCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { UserUpdateRequest } from '@api/requests/Users/UserUpdateRequest';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';
import { LoggedUser } from '@base/decorators/LoggedUser';
import { LoggedUserInterface } from '@api/interfaces/users/LoggedUserInterface';
import { UserService } from '@base/api/services/Users/UserService';
import { Student } from '@base/api/models/Students/Student';
import { StudentCreateRequest } from '@base/api/requests/Students/StudentCreateRequest';
import { createQueryBuilder } from 'typeorm';
import { Course } from '@base/api/models/Courses/Course';

@Service()
@OpenAPI({
    security: [{ bearerAuth: [] }],
})
@JsonController('/students')
@UseBefore(StudentCheck)
export class StudentController extends ControllerBase {
    public constructor(private studentService: StudentService, private userService: UserService, private courseService: CourseService) {
        super();
    }

    private async getRegisteredCourses(studentId: string) {
        let courses = await createQueryBuilder(Student, 'student').select('student.courses').where(`student.id = :value`, { value: studentId }).getMany();

        return courses;
    }

    private async getRegisteredSlots(studentId: string) {
        let courses = await createQueryBuilder(Student, 'student').select('student.slots').where(`student.id = :value`, { value: studentId }).getMany();

        return courses;
    }

    @Get('/timetable')
    public async getTimeTable(@QueryParams() parseResourceOptions: RequestQueryParser, @LoggedUser() loggedUser: LoggedUserInterface) {
        const resourceOptions = parseResourceOptions.getAll();

        let current_user = await createQueryBuilder(Student, 'student').select('student').where(`student.user_id = :value`, {value: loggedUser.userId}).getOne();
        let registered_courses = this.getRegisteredCourses(current_user.id);
        let registered_slots = this.getRegisteredSlots(current_user.id);

        return {
            registered_slots: registered_slots,
            registered_courses: registered_courses,
        }
        // return await this.studentService.getAll(resourceOptions);


    }

    // @Get('/:id([0-9A-Za-z]+)')
    // public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    //     const resourceOptions = parseResourceOptions.getAll();

    //     return await this.studentService.findOneById(id, resourceOptions);
    // }

    // @Get('/me')
    // public async getMe(@QueryParams() parseResourceOptions: RequestQueryParser, @LoggedUser() loggedUser: LoggedUserInterface) {
    //     const resourceOptions = parseResourceOptions.getAll();

    //     return await this.studentService.findOneById(loggedUser.userId, resourceOptions);
    // }

    // public async findStudent(field: any, value: any) {
    //     let findStudentsQuery = createQueryBuilder(Student, 'student').select('student.reg_no').where(`student.${field} = :value`, { value: value }).getOne();

    //     return findStudentsQuery;
    // }

}
