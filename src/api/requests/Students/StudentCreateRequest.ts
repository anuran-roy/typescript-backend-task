import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { UserCreateRequest } from '../Users/UserCreateRequest';

export class StudentCreateRequest extends UserCreateRequest {
    @MaxLength(10)
    @MinLength(9)
    @IsString()
    @IsNotEmpty()
    reg_no: string;
}
