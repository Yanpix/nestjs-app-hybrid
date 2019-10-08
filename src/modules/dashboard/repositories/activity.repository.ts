import { EntityRepository, Repository } from 'typeorm';
import { ActivityEntity } from '../entities';
import { PaymentStatus } from '../types/payment-status.type';

@EntityRepository(ActivityEntity)
export class ActivityRepository extends Repository<ActivityEntity> {

    async updateActivity({ temper_activity_id, start_confirmed, end_confirmed, activity_amount_confirmed, amount_tax }) {
        return await this.createQueryBuilder()
            .update()
            .set({
                start_confirmed: start_confirmed,
                end_confirmed: end_confirmed,
                activity_amount_confirmed: activity_amount_confirmed,
                amount_tax: amount_tax,
                activity_confirmed: () => `now()`,
            })
            .where('temper_activity_id = :id', { id: temper_activity_id })
            .execute();
    }

    async getInvoicesByStatus(status: PaymentStatus, fromDate: string): Promise<ActivityEntity[]> {
        return await this.createQueryBuilder('activity')
            .select(['activity.activity_amount_confirmed', 'activity.amount_tax'])
            .leftJoinAndSelect('activity.invoice', 'invoice')
            .where('invoice.status = :statusType', { statusType: status })
            .andWhere('invoice.date_modified > :from', { from: fromDate })
            .getMany();
    }
}