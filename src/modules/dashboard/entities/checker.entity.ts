import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { ActivityEntity, PersonEntity } from '.';
import { ProductType } from '../types/temper-product.type';
import { AppConstants } from '@constants';

@Entity('checker')
export class CheckerEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    policy_file: string;

    @Column({ default: AppConstants.AppProduct }) name: string;

    @Column({
        type: 'enum',
        enum: ProductType,
        default: 'T'
    })
    number_product: ProductType;

    @Column() number_counter: number;

    @Column({ unique: true, nullable: true }) full_number: string;

    @Column({ default: 1 }) is_active: number;

    @Column({
        default: () => `now()`,
    })
    date_created: Date;

    @OneToOne(type => PersonEntity, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'person_id' })
    person: PersonEntity;

    @OneToMany(type => ActivityEntity, activity => activity.policy)
    activities: ActivityEntity[];
}
