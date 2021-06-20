export interface IncomeModel {
    id: number;
    transactionMonth?: string;
    incomeSource: string;
    howMuchMoney: number;
    currencyType: string;
    transactionDatetime: string;
    transactionNotes: string;
}