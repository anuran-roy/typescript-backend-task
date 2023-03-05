import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Timing } from '../Timings/Timing';
import { CourseType } from '@base/api/types/Courses/Courses';
@Entity({ name: 'slots' })
export class Slot extends EntityBase {
    @PrimaryColumn()
    id: string; // Slots are unique, eg: L1, L2, A1, A2

    @Column()
    name: string;

    @ManyToMany(() => Timing, timing => timing.id)
    @JoinTable()
    timings: number[];

    @Column()
    course_type: CourseType;
}
