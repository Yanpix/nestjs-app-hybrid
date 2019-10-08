import { IsNotEmpty } from 'class-validator';
import { ClaimStatus } from '../../temper/types/claim-status.type';


export class UpdateClaimDto {
    @IsNotEmpty()
    readonly status: ClaimStatus;

    paid_amount: number;
}