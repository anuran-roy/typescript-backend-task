import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Faculty } from '../Faculty/Faculty';
import { Slot } from '../Slots/Slot';
import { Student } from '../Students/Student';

type CourseType = 'THEORY' | 'LAB';

@Entity({ name: 'courses' })
export class Course extends EntityBase {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    // @ManyToMany(() => Student)
    // @JoinTable()
    // students: Student[];
    
    @ManyToMany(() => Faculty)
    @JoinTable()
    faculties: Faculty[];

    @Column()
    course_type: CourseType;

    @ManyToMany(() => Slot)
    @JoinTable()
    allowed_slots: Slot[];
}
