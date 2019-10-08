import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, Index, JoinColumn, OneToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ActivityEntity } from '.';
import { PaymentStatus } from '../types/payment-status.type';


@Entity('data')
export class DataEntity {

    @PrimaryGeneratedColumn() id: number;

    @Column({
        type: 'datetime',
        default: () => `now()`,
    })
    date_created: Date;

    @Column({
        type: 'datetime',
        default: () => `now()`,
    })
    date_modified: Date;

    @Column({ default: 'TM' }) preffix: string;

    @Column({ type: 'year' }) year: number;

    @OneToOne(type => ActivityEntity, activity => activity.id)
    @JoinColumn({ name: 'activity_id' })
    activity: string;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: 'sent'
    })
    status: PaymentStatus;

    @BeforeInsert()
    generateInvoiceDate() {
        this.year = Number(new Date().getFullYear());
    }

    @BeforeUpdate()
    updateDateModified() {
        this.date_modified = new Date();
    }


}