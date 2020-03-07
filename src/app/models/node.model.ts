export class NodeModel {
    expenseModelId?: number;
    title: string;
    level?: number;
    sumOfMoney?: number;
    modeOfPayment: string;
    currencyType: string;
    childrenNodes: NodeModel[];
    tracePath?: string;
    collapse?: boolean = true;
}