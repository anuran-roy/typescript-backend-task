import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Course } from '../Courses/Course';
import { User } from '../Users/User';
import { Slot } from '../Slots/Slot';

@Entity({ name: 'students' })
export class Student extends EntityBase {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => User, user => user.user_id)
    @JoinTable()
    userId: number;

    @ManyToMany(() => Course)
    @JoinTable()
    courses: Course[];

    @ManyToMany(() => Slot)
    @JoinTable()
    slots: Slot[];
}
