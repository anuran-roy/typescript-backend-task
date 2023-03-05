import { CourseType } from '@base/api/types/Courses/Courses';
import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsArray, IsNumber, IsEnum } from 'class-validator';

export class CourseCreateRequest {
    @MaxLength(7)
    @MinLength(7)
    @IsString()
    @IsNotEmpty()
    id: string;

    @MaxLength(100)
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsNotEmpty()
    slot_ids: number[];

    @IsArray({ message: 'faculty_ids must be an array of numbers' })
    @IsNotEmpty()
    faculty_ids: number[];

    @IsString()
    @IsNotEmpty()
    course_type: CourseType;
}
