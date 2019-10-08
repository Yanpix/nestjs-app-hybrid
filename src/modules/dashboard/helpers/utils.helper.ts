import * as moment from 'moment';

export class UtilsHelper {

    /**
     * Subtract days from current Date
     * Return days
     * @param days Days value (number)
     */
    static subtractDaysFromCurrent (days: number) {
        return moment().subtract(days, 'days').format('YYYY-MM-DD HH:MM:SS');
    }

}
