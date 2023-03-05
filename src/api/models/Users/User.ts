import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Exclude, Expose } from 'class-transformer';
import { Role } from './Role';
import { HashService } from '@base/infrastructure/services/hash/HashService';

@Entity({ name: 'users' })
export class User extends EntityBase {
    @PrimaryGeneratedColumn('increment')
    user_id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    role_id: number;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @Expose({ name: 'full_name' })
    get fullName() {
        return this.first_name + ' ' + this.last_name;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async setPassword() {
        if (this.password) this.password = await new HashService().make(this.password);
    }

    @BeforeInsert()
    async setDefaultRole() {
        const roleId = this.role_id ? this.role_id : 3;

        this.role_id = roleId;
    }
}
