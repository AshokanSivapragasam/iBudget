export interface ExpenseModel {
    id: number;
    areaOfPayment: string;
    modeOfPayment: string;
    itemOrService: string;
    howMuchMoney: number;
    currencyType: string;
    transactionDatetime: string;
    transactionNotes: string;
}