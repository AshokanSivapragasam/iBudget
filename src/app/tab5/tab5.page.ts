import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';

import { ExpenseModel } from '../models/expense.model';
import { SqliteStorageService } from '../services/sqlite-storage/sqlite-storage.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  recurrentExpenseModels: ExpenseModel[] = [];

  constructor(private router: Router,
              private sqliteStorageService: SqliteStorageService) {
  }

  ionViewWillEnter() {
    this.getFrequentExpenseTransactions();
  }

  getFrequentExpenseTransactions() {
    this.sqliteStorageService.getFreqTop5ExpensesFromDbAsync()
    .then(_expenseModels_ => {
      this.recurrentExpenseModels = _expenseModels_;
    })
  }

  goToExpensePage(frequentExpenseTransactionId: number) {
    this.router.navigate(['/tabs/tab2/frequent-expense-transaction', frequentExpenseTransactionId]);
  }
}
