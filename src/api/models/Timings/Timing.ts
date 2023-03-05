import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
// import { Slot } from '../Slots/Slot';

type TimingDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

@Entity({ name: 'timings' })
export class Timing extends EntityBase {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    day: TimingDay;

    @Column()
    start: string;

    @Column()
    end: string;
}
