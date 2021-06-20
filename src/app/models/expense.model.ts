export interface ExpenseModel {
    id: number;
    labels: string;
    transactionMonth?: string;
    areaOfPayment: string;
    modeOfPayment: string;
    itemOrService: string;
    howMuchMoney: number;
    currencyType: string;
    transactionDatetime: string;
    transactionNotes: string;
}