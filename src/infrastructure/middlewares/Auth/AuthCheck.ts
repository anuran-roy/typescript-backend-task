import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';
import { authConfig } from '@base/config/auth';
import { Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { Role } from '@base/api/models/Users/Role';


@Service()
export class AuthCheck implements ExpressMiddlewareInterface {
    async findRole(role_id: number) {
        let role = await createQueryBuilder(Role, 'role').select('role').where('role.role_id = :role_id', { role_id: role_id }).getOne();
        return role.role;
    }
    use(request: any, response: Response, next?: (err?: any) => any): any {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).send({ status: 403, message: 'Unauthorized!' });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, authConfig.providers.jwt.secret, (err: any, user: any) => {
            if (err) {
                return response.status(403).send({ status: 403, message: 'Forbidden!' });
            }

            request.loggedUser = user;
            next();
        });
    }
}

@Service()
export class AdminCheck extends AuthCheck {
    async isAdmin(role_id: number) {
        let role = await this.findRole(role_id);
        return role.toLowerCase() === 'admin';
    }

    use(request: any, response: Response, next?: (err?: any) => any): any {
        super.use(request, response, next);
        let isAdmin = this.isAdmin(request.loggedUser.role_id);
        if (!isAdmin) {
            return response.status(403).send({ status: 403, message: 'Forbidden!' });
        }
    }
}

@Service()
export class FacultyCheck extends AuthCheck {
    async isFaculty(role_id: number) {
        let role = await this.findRole(role_id);
        return role.toLowerCase() === 'faculty';
    }

    use(request: any, response: Response, next?: (err?: any) => any): any {
        super.use(request, response, next);
        let isFaculty = this.isFaculty(request.loggedUser.role_id);
        if (!isFaculty) {
            return response.status(403).send({ status: 403, message: 'Forbidden!' });
        }
    }
}

@Service()
export class StudentCheck extends AuthCheck {
    async isStudent(role_id: number) {
        let role = await this.findRole(role_id);
        return role.toLowerCase() === 'faculty';
    }

    use(request: any, response: Response, next?: (err?: any) => any): any {
        super.use(request, response, next);
        let isStudent = this.isStudent(request.loggedUser.role_id);
        if (!isStudent) {
            return response.status(403).send({ status: 403, message: 'Forbidden!' });
        }
    }
}