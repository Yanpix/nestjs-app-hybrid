import { EntityRepository, Repository } from 'typeorm';
import { PaymentsEntity } from '../entities';
import { plainToClass } from 'class-transformer';

@EntityRepository(PaymentsEntity)
export class PaymentsRepository extends Repository<PaymentsEntity> {

    async upsert(paymentData){
        try {
            let findPayment = await this.findOne({ where: { temper_payment_id: paymentData.temper_payment_id } });
            if (findPayment === undefined) {
                await this.save(plainToClass(PaymentsEntity, paymentData));
            } else {
                await this.createQueryBuilder()
                    .update()
                    .set(paymentData)
                    .where('temper_payment_id = :id', { id: paymentData.temper_payment_id })
                    .execute();
            }
        } catch (error) {
            return { type: 'error', message: error.message }
        }
    }
    
}