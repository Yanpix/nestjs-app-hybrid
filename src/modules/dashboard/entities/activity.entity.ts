import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, Index, JoinColumn, ManyToOne, BeforeInsert, OneToOne, ManyToMany, OneToMany, AfterLoad } from 'typeorm';
import { IsDefined } from 'class-validator';
import * as uniqid from 'uniqid';
import { CheckerEntity, DataEntity } from './';

@Entity('activity')
export class ActivityEntity {

    @PrimaryColumn() id: string;

    @Index({ unique: true })
    @Column({
        type: 'varchar',
        length: 250,
    })
    @IsDefined()
    service_id: string;

    @OneToOne(type => DataEntity, invoice => invoice.activity)
    invoice: DataEntity;

    @ManyToOne(type => CheckerEntity, policy => policy.activities)
    @JoinColumn({ name: 'policy_id' })
    policy: string;

    @Column({
        type: 'datetime',
        default: () => `now()`,
    })
    activity_added: Date;

    @Column({ type: 'datetime' }) activity_confirmed: Date;

    @Column({
        type: 'decimal',
        precision: 6,
        scale: 2,
        default: 0,
    })
    amount_initial: number;

    @Column({
        type: 'decimal',
        precision: 6,
        scale: 2,
        default: 0,
    })
    amount_tax: number;

    // Virtual field: amount + tax
    priceAmountIncludingTax: number;

    @BeforeInsert()
    doBeforeInsert() {
        this.id = uniqid.process();
    }

    @AfterLoad()
    doAfterLoad() {
        this.priceAmountIncludingTax = Number(this.amount_initial) + Number(this.amount_tax);
    }

}