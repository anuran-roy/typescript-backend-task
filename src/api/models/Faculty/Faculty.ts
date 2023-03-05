import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Timing } from '../Timings/Timing';
import { User } from '../Users/User';

@Entity({ name: 'faculties' })
export class Faculty extends EntityBase {
    @PrimaryColumn()
    id: string; // Faculty Employment IDs are unique, eg: 1234567

    @OneToOne(() => User, user => user.user_id)
    @JoinTable()
    userId: number;
    
    @Column()
    name: string;
}
