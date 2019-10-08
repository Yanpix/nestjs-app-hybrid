import { EntityRepository, Repository } from 'typeorm';
import { ActivateTokenEntity } from '../entities';
import { TokenDto } from '../dto';

@EntityRepository(ActivateTokenEntity)
export class ActivateTokenRepository extends Repository<ActivateTokenEntity> {

    async insertToken(tokenData: TokenDto): Promise<boolean> {
        try {
            await this.save(tokenData);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getOne(token: string): Promise<ActivateTokenEntity> {
        return await this.findOne({ token_string: token });
    }

    async updateToken(tokenData: TokenDto): Promise<boolean> {
        try {
            await this.update({ token_string: tokenData.token_string }, { expired_at: tokenData.expired_at });
            return true;
        } catch (error) {
            return false;
        }
    }
}