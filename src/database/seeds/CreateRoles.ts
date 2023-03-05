import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import { RoleRepository } from '@base/api/repositories/Users/RoleRepository';

export default class CreateRoles implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const roles = [{ role: 'Admin' }, { role: 'Faculty' }, { role: 'Student' }];

        for (const [key, value] of Object.entries(roles)) {
            const role = await connection.getCustomRepository(RoleRepository).findOne({ where: { role: value.role } });

            if (role) {
                continue;
            }

            await connection.getCustomRepository(RoleRepository).createRole({ role: value.role });
        }
    }
}
