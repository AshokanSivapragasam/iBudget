import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { ExpenseModel } from '../models/expense.model';
import { IncomeModel } from '../models/income.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  totalSumOfMoneyAsIncome: number = 0;
  totalSumOfMoneyAsExpense: number = 0;
  constructor(private commonService: CommonService) {}

  getRemainingSumOfMoney(): number {
    this.totalSumOfMoneyAsIncome = this.commonService.incomeModels.reduce((_totalSum_, _currentIncomeModel_) => _totalSum_ + _currentIncomeModel_.howMuchMoney, 0);
    this.totalSumOfMoneyAsExpense = this.commonService.expenseModels.reduce((_totalSum_, _currentExpenseModel_) => _totalSum_ + _currentExpenseModel_.howMuchMoney, 0);
    return this.totalSumOfMoneyAsIncome - this.totalSumOfMoneyAsExpense;
  }

  deleteIncomeTransaction(index: number) {
    this.commonService.incomeModels = this.commonService.incomeModels.filter(incomeModel => incomeModel.id != index);
  }
  
  deleteExpenseTransaction(index: number) {
    this.commonService.expenseModels = this.commonService.expenseModels.filter(expenseModel => expenseModel.id != index);
  }
}
