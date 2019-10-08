import { InsurancePolicyEntity } from '../../temper/entities';
import { ReturningPersonsInterface } from '../interfaces';
import * as moment from 'moment';
import { UtilsHelper } from './utils.helper';

export class ArrayHelper {

    constructor(
    ) { }

    /**
     * Filter policices without any activity or when activity less than specific date
     * @param dataArr 
     */
    static filterPoliciesWithoutActivities(dataArr) {
        let selectFromDate = UtilsHelper.subtractDaysFromCurrent(30);
        return dataArr.filter(policy => {
            if (policy.activities.length == 0) {
                return policy;
            } else {
                let lastestActivity = new Date(Math.max.apply(null, policy.activities.map((e) => {
                    return new Date(e.activity_added);
                })));
                let dataAt = moment(lastestActivity).diff(moment(selectFromDate, 'YYYY-MM-DD HH:MM:SS'), 'days');
                if (dataAt < 0) {
                    return policy;
                }
            }
        });
    }

    /**
     * Create new Activities array
     * @param activitiesArray 
     */
    static generateActivitiesDatesArray(activitiesArray: InsurancePolicyEntity[]): Array<ReturningPersonsInterface> {
        let returnPersonsWithActivities = [];

        activitiesArray
            .filter(data => data.activities.length > 1)
            .map(e => {
                e.activities.forEach(v => {
                    returnPersonsWithActivities.push({ activity_added: v.activity_added })
                });
            });

        return returnPersonsWithActivities;
    }

}