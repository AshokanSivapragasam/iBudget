import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';

import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SqliteStorageService } from '../services/sqlite-storage/sqlite-storage.service';

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

  constructor(private activatedRoute: ActivatedRoute,
              private sqliteStorageService: SqliteStorageService) {
  }

  ngOnInit() {
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    this.routeParams = this.activatedRoute.snapshot.params;
  }

  ionViewWillEnter() {
    this.sqliteStorageService.getDataForPieChartFromDbAsync()
    .then(_freePieChartData_ => {
      this.freePieChartData = _freePieChartData_;
    });
  }
}
