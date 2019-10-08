import { Controller, Get, Post, Res, Req, Param, UseGuards, Body } from '@nestjs/common';
import { ClaimMessageRepository } from '../../temper/repositories';
import { PassportAuthGuard } from '@guards';


@UseGuards(PassportAuthGuard)
@Controller('notice')
export class NoticeController {
    constructor(
        private readonly claimMessageRepository: ClaimMessageRepository,
    ) { }
    
    /**
     * Get all notices for claim
     * @param res Response
     * @param claimId Claim ID
     */
    @Get(':claimId')
    async getNotices(@Res() res, @Param('claimId') claimId: string) {
        let notices = await this.claimMessageRepository.find({ where: { claim: claimId } });
        return res.json({ result: notices });
    }

    /**
     * Save notice and return array of notices
     * @param res Response
     * @param req Request
     * @param claimId Claim ID
     * @param notice 
     */
    @Post(':claimId')
    async addNotice(@Res() res, @Req() req, @Param('claimId') claimId: string, @Body() notice) {
        let noticeObject = {
            claim: claimId,
            user_id: req.user.id,
            user_name: req.user.fullname,
            message_text: notice.text
        }
        let notices = await this.claimMessageRepository.addAndGetAll(noticeObject);
        return res.json({ result: notices });
    }


}
