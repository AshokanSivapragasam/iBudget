export interface ExpenseModel {
    id: number;
    isPrivate: boolean;
    areaOfPayment: string;
    modeOfPayment: string;
    itemOrService: string;
    howMuchMoney: number;
    currencyType: string;
    transactionDatetime: string;
    transactionNotes: string;
}