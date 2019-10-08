import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SettingsService } from './';
import { ClaimRepository, InsurancePolicyRepository, ActivityRepository } from '../../temper/repositories';
import { ITiles } from '../interfaces';

@Injectable()
export class MainService {
    constructor(
        @Inject(forwardRef(() => SettingsService)) private readonly settingsService: SettingsService,
        private readonly claimRepository: ClaimRepository,
        private readonly insurancePolicyRepository: InsurancePolicyRepository,
        private readonly activityRepository: ActivityRepository,
    ) { }

    /**
     * Get dashboard home page tiles values
     */
    async getTilesData(): Promise<ITiles> {
        let amountRatio = Number(await this.settingsService.getSetting('taxes', 'amount_rate')) / 100;
        let activities = await this.activityRepository.find();
        activities.length
        let totalAmount: number;
        if (activities.length > 0) {
            totalAmount = activities
                .map(el => el.activity_amount_confirmed)
                .reduce((curr, prev) => {
                    return Number(curr) + Number(prev);
                });
        } else {
            totalAmount = 0;
        }

        return {
            totalPolicies: await this.insurancePolicyRepository.count(),
            totalClaims: await this.claimRepository.count(),
            totalHours: Number(totalAmount) / amountRatio,
            totalAmount: Number(totalAmount)
        }
    }


}