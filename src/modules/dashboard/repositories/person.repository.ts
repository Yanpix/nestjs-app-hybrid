import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { PersonEntity, ActivityEntity } from '../entities';

@EntityRepository(PersonEntity)
export class PersonRepository extends Repository<PersonEntity> {

    async findById(id: string): Promise<PersonEntity | null> {
        return await this.findOneOrFail(id);
    }

    async findByTemperId(id: string): Promise<PersonEntity> {
        return await this.findOne({ temper_id: id });
    }

    async findAll(): Promise<PersonEntity[]> {
        try {
            return await this.find();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}
