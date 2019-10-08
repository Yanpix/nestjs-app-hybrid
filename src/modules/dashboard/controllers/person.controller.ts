import { Controller, Get, Post, Res, Req, UseGuards, Param, InternalServerErrorException, Body } from '@nestjs/common';
import { PassportAuthGuard } from '@guards';
import { FishService } from '../services';
import { PersonRepository, InsurancePolicyRepository } from '../../temper/repositories';
import * as moment from 'moment';

@UseGuards(PassportAuthGuard)
@Controller('person')
export class PersonController {

    constructor(
        private readonly personRepository: PersonRepository,
        private readonly insurancePolicyRepository: InsurancePolicyRepository,
        private readonly fishService: FishService,
    ) { }

    /**
     * Get person, its policy and invoices and render view
     * @param res Response
     * @param id Person ID
     */
    @Get(':id')
    async getIndex(@Res() res, @Param('id') id: string) {
        try {
            let person = await this.personRepository.findOne(id, { relations: ['policy', 'claims'] });
            let policy = await this.insurancePolicyRepository.findOne({
                relations: ['activities', 'activities.invoice'],
                where: {
                    person: id,
                },
            });
            let invoices = policy.activities
                .map(el => el.invoice)
                .filter(el => el);

            return res.render('admin/person', { person: person, invoices: invoices, moment: moment });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Check person on Fish service
     * @param res 
     * @param id Person ID
     */
    @Get(':id/check')
    async checkPerson(@Res() res, @Param('id') id: string) {
        try {
            const person = await this.personRepository.findOne(id);
            const fishCheckResult = await this.fishService.checkPerson(person);
            let fullCodesExplanation = (fishCheckResult) ? await this.fishService.explainResponseCodes(fishCheckResult) : [];
            res.json({ status: 'success', data: fullCodesExplanation });
        } catch (error) {
            console.log("TCL: PersonController -> checkPerson -> error", error)
            res.json({ status: 'error', data: error.message });
        }
    }


}
