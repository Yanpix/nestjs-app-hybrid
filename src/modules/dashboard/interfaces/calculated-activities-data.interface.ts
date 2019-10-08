export interface ICalculatedActivitiesData {
    readonly totalAmountWithTax: number;
    readonly totalTax: number;
    readonly premiumTotal: number;
    readonly commissionBroker: number;
    readonly premiumExcludingCommissionBroker: number;
    readonly commissionMga: number;
    readonly excludingAllCommissions: number;
    readonly paidInvoicesTotal?: number; //for Chubb getMonthData method return
}