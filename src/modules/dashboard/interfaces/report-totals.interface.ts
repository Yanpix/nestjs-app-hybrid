import { IActivitiesTotals, ICalculatedActivitiesData, ICalculatedClaimsData } from '.';

export interface IChubbReportTotals {
    readonly totals: ICalculatedActivitiesData & ICalculatedClaimsData;
    readonly paidInvoicesTotals: IActivitiesTotals;
}