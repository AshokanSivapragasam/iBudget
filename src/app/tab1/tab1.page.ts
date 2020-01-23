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
  expenseModels: ExpenseModel[] = [];
  incomeModels: IncomeModel[] = [];
  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.expenseModels = this.commonService.expenseModels;
    this.incomeModels = this.commonService.incomeModels;
  }
}
