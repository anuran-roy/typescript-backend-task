import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { User } from './User';

@Entity({ name: 'roles' })
export class Role extends EntityBase {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToMany(() => User, user => user.role)
    @Column()
    role: string;
}
