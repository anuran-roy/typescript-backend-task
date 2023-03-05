import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { StudentService } from '@api/services/Students/StudentService';
import { CourseService } from '@api/services/Courses/CourseService';
import { Service } from 'typedi';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import { AdminCheck, AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
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
import { CourseCreateRequest } from '@base/api/requests/Courses/CourseCreateRequest';
import { Course } from '@base/api/models/Courses/Course';

@Service()
@OpenAPI({
    // security: [{ bearerAuth: [] }],
})
@JsonController('/admin')
@UseBefore(AdminCheck)
export class AdminController extends ControllerBase {
    public constructor(private studentService: StudentService, private userService: UserService, private courseService: CourseService) {
        super();
    }

    // @Get('/timetable')
    // public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    //     const resourceOptions = parseResourceOptions.getAll();

    //     return await this.studentService.getAll(resourceOptions);
    // }

    // @Get('/:id([0-9A-Za-z]+)')
    // public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    //     const resourceOptions = parseResourceOptions.getAll();

    //     return await this.studentService.findOneById(id, resourceOptions);
    // }

    @Get('/me')
    public async getMe(@QueryParams() parseResourceOptions: RequestQueryParser, @LoggedUser() loggedUser: LoggedUserInterface) {
        const resourceOptions = parseResourceOptions.getAll();

        return await this.studentService.findOneById(loggedUser.userId, resourceOptions);
    }

    public async findStudent(field: any, value: any) {
        let findStudentsQuery = createQueryBuilder(Student, 'student').select('student.reg_no').where(`student.${field} = :value`, { value: value }).getOne();

        return findStudentsQuery;
    }

    public async findCourse(field: any, value: any) {
        let findCourseQuery = createQueryBuilder(Course, 'course').select('student.reg_no').where(`student.${field} = :value`, { value: value }).getMany();

        return findCourseQuery;
    }

    @Post('/course')
    @HttpCode(201)
    public async createCourse(@Body() course: CourseCreateRequest) {
        let findCourseQuery = await this.findCourse('id', course.id);
        
        if (findCourseQuery) {
            throw new Error('Course with this id already exists');
        }

        let newCourse: Course = await this.courseService.create(course);
        return newCourse;
    }

    @Post('/student')
    @HttpCode(201)
    public async createStudent(@Body() student: StudentCreateRequest) {
        let findStudentsQuery = this.findStudent('email', student.email);

        if (findStudentsQuery) {
            throw new Error('Student with this email already exists');
        }

        let user = await this.userService.create(student);
        let newStudent: Student = await this.studentService.create(student);
        newStudent.userId = user.user_id;

        return newStudent;

    }

    @Put('/:id')
    public async update(@Param('id') id: number, @Body() user: UserUpdateRequest) {
        return await this.studentService.updateOneById(id, user);
    }

    @Delete('/:id')
    @HttpCode(204)
    public async delete(@Param('id') id: number) {
        return await this.studentService.deleteOneById(id);
    }
}
