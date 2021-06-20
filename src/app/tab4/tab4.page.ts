import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';

import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SqliteStorageService } from '../services/sqlite-storage/sqlite-storage.service';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  currentDatetime: string = '';
  title = '..Budget chart..';
  type = 'PieChart';
  freePieChartData = [
    ['Firefox', 45.0],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 0.7] 
  ];
  columnNames = ['FoodCategory', 'Percentage'];
  options = {    
  };
  width = '100%';
  height = 400;
  messageText: string;
  queryParams: any;
  routeParams: any;
  segment: string;
  idx: number = 0;
  monthOptions: string[] = [];
  monthOption: string;
  _datePipeFormat_ = 'MMM-y';

  constructor(private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe,
              private sqliteStorageService: SqliteStorageService,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    this.routeParams = this.activatedRoute.snapshot.params;
  }

  async ionViewWillEnter() {
    await this.sqliteStorageService.getUniqueTransactionMonthsFromDbAsync()
    .then(_uniqueMonths_ => {
      this.monthOptions = _uniqueMonths_;
      this.monthOption = this.monthOptions[this.monthOptions.length - 1];
    });
    
    await this.getPieChartDateForAMonthAsync(this.monthOption);
  }

  async goBackAsync(idx: number) {
    idx -= (idx > 0 ? 1: 0);
    this.monthOption = this.monthOptions[idx];
    
    await this.getPieChartDateForAMonthAsync(this.monthOption);
  }

  async goForwardAsync(idx: number) {
    idx += (idx < this.monthOptions.length ? 1: 0);
    this.monthOption = this.monthOptions[idx];
    
    await this.getPieChartDateForAMonthAsync(this.monthOption);
  }
  
  async getPieChartDateForAMonthAsync(monthName: string) {
    await this.sqliteStorageService.getDataForPieChartForAMonthFromDbAsync(this.monthOption)
    .then(_freePieChartData_ => {
      this.freePieChartData = [];
      _freePieChartData_.forEach(_value_ => {
        this.freePieChartData.push([_value_.areaOfPayment, _value_.sumOfMoney]);
      });
    });
  }
}
