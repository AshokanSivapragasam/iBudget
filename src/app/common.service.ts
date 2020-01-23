import { Injectable } from '@angular/core';
import { ExpenseModel } from './models/expense.model';
import { IncomeModel } from './models/income.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  expenseModels: ExpenseModel[] = [];
  incomeModels: IncomeModel[] = [];
  constructor() { }
}
