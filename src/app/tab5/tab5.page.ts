import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';

import { ExpenseModel } from '../models/expense.model';
import { SortModel } from '../models/sort.model';
import { SqliteStorageService } from '../services/sqlite-storage/sqlite-storage.service';
import { MessageService } from '../services/message/message.service';
import { Observable, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page implements AfterViewInit {
  @ViewChild('canvasSection', { read: undefined, static: false }) public canvasSection: ElementRef;
  every30MilliSecondSubscription01: Subscription;
  every30MilliSecondSubscription02: Subscription;
  every30MilliSecondSubscription03: Subscription;
  every30MilliSecond: Observable<number> = timer(0, 30);
  everySecond: Observable<number> = timer(0, 800);
  recurrentExpenseModels: ExpenseModel[] = [];
  totalMenuItems: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  menuItemIndices: number[] = [0, 1, 2];
  points: any[] = [];
  bezierPoints: any[] = [];
  _second_ = 0;
  
  xPoints: number[] = [this.getRandomInteger(700)];
  yPoints: number[] = [this.getRandomInteger(700)];
  ctx: any;

  constructor(private router: Router,
              private sqliteStorageService: SqliteStorageService,
              private messageService: MessageService) {
    /*for (var angle = 0; angle < 360; angle += 20) {
      this.getAnyPointInSquareInsideCircle(angle);
    }*/

    /*this.everySecond.subscribe(second => {
      this._second_ = second;
      this.xPoints = [this.xPoints[this.xPoints.length - 1]];
      this.yPoints = [this.yPoints[this.yPoints.length - 1]];
      for (var idx = 0; idx < 4; idx += 1) {
        this.xPoints.push(this.getRandomInteger(700));
        this.yPoints.push(this.getRandomInteger(700));
      }

      // https://www.codeproject.com/KB/recipes/BezirCurves/general.jpg
      for (var tConstant = 0; tConstant < 1; tConstant += 0.01) {
        this.bezierPoints.push(this.getBezierPoint(tConstant, this.xPoints, this.yPoints));
      }
    });*/
  }

  ngAfterViewInit() {
    var canvas = this.canvasSection.nativeElement;
    this.ctx = canvas.getContext('2d');
    
    var img = new Image(20, 20);
    img.src = "https://materialdesignicons.com/api/download/icon/svg/8B580447-CD93-41E8-BDB0-F37DAE420D3A";

    var listOfIntegers01 = Array.from(Array(255).keys()).map(_integer_ => ({
      color: 'rgb(' + this.getRandomInteger(255) + ', ' + this.getRandomInteger(255) + ', ' + this.getRandomInteger(255) + ')',
      integer: _integer_
    }));
    listOfIntegers01 = this.shuffleArray(listOfIntegers01);
    this.bubbleSort(listOfIntegers01);

    var listOfIntegers02 = Array.from(Array(255).keys()).map(_integer_ => ({
      color: 'rgb(' + this.getRandomInteger(255) + ', ' + this.getRandomInteger(255) + ', ' + this.getRandomInteger(255) + ')',
      integer: _integer_
    }));
    listOfIntegers02 = this.shuffleArray(listOfIntegers02);
    this.selectionSort(listOfIntegers02);

    var listOfIntegers03 = Array.from(Array(255).keys()).map(_integer_ => ({
      color: 'rgb(' + this.getRandomInteger(255) + ', ' + this.getRandomInteger(255) + ', ' + this.getRandomInteger(255) + ')',
      integer: _integer_
    }));
    listOfIntegers03 = this.shuffleArray(listOfIntegers03);
    this.insertionSort(listOfIntegers03);
    /*this.everySecond.subscribe(second => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'limegreen';
      for (var idx = 1; idx < this.xPoints.length; idx += 1) {
        //ctx.moveTo(this.xPoints[idx - 1], this.yPoints[idx - 1]);
        //ctx.lineTo(this.xPoints[idx], this.yPoints[idx]);
      }
      this.ctx.stroke();
    });

    this.ctx.beginPath();
    this.ctx.fillStyle = 'limegreen';
    this.every30MilliSecond.subscribe(second => {
      var _idx_ = second % this.bezierPoints.length;
      this.ctx.fillRect(this.bezierPoints[_idx_].pointX, this.bezierPoints[_idx_].pointY, 2, 2); // fill in the pixel at (10,10)
    });
    this.ctx.stroke();*/
  }

  ionViewWillEnter() {
    this.getFrequentExpenseTransactions();
  }

  insertionSort(listOfIntegers: SortModel[]) {
    var minIdx = 0;
    var idx = 0;
    this.every30MilliSecondSubscription03 = this.every30MilliSecond.subscribe(second => {
      minIdx = idx;
      for (var idy = idx - 1; idy >= 0; idy -= 1) {
        if (listOfIntegers[minIdx].integer < listOfIntegers[idy].integer) {
            this.swap(listOfIntegers, minIdx, idy);
            minIdx = idy;
        }
      }
      this.paintArray(0, 600, listOfIntegers);
      idx += 1;
      if(idx >= listOfIntegers.length) this.every30MilliSecondSubscription03.unsubscribe();
    });
  }

  selectionSort(listOfIntegers: SortModel[]) {
    var minIdy = 0;
    var idx = 0;
    this.every30MilliSecondSubscription02 = this.every30MilliSecond.subscribe(second => {
      minIdy = idx;
      for (var idy = minIdy + 1; idy < listOfIntegers.length; idy += 1)
          if (listOfIntegers[minIdy].integer > listOfIntegers[idy].integer) minIdy = idy;
      if (minIdy != idx) this.swap(listOfIntegers, idx, minIdy);
      this.paintArray(0, 300, listOfIntegers);
      idx += 1;
      if(idx >= listOfIntegers.length) this.every30MilliSecondSubscription02.unsubscribe();
    });
  }

  bubbleSort(listOfIntegers: SortModel[]) {
    var idx = 0;
    this.every30MilliSecondSubscription01 = this.every30MilliSecond.subscribe(second => {
      for (var idy = idx + 1; idy < listOfIntegers.length; idy += 1) {
        if(listOfIntegers[idx].integer > listOfIntegers[idy].integer) {
          this.swap(listOfIntegers, idx, idy);
        }
      }
      this.paintArray(0, 0, listOfIntegers);
      idx += 1;
      if(idx >= listOfIntegers.length) this.every30MilliSecondSubscription01.unsubscribe();
    });
  }

  swap(listOfIntegers: SortModel[], idx: number, idy: number) {
    var temp = listOfIntegers[idx];
    listOfIntegers[idx] = listOfIntegers[idy];
    listOfIntegers[idy] = temp;
  }

  paintArray(x: number, y: number, array: SortModel[]) {
    this.ctx.clearRect(x, y, 1366, y + 300);
    this.ctx.beginPath();
    array.forEach((item, idx) => {
      this.ctx.fillStyle = item.color;
      this.ctx.fillRect((x + idx) * 5, y, 5, item.integer);
    });
    
    this.ctx.stroke();
  }

  shuffleArray(array: SortModel[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  getRandomInteger(maxRange: number) {
    return Math.floor((Math.random() * maxRange) + 1);
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

  goForward() {
    this.menuItemIndices.forEach((menuItemIndex, idx) => {
      this.menuItemIndices[idx] = (menuItemIndex + 1) % this.totalMenuItems.length;
    });
    console.log(this.menuItemIndices);
  }

  goBack() {
    this.menuItemIndices.forEach((menuItemIndex, idx) => {
      this.menuItemIndices[idx] = this.totalMenuItems.length - (((this.totalMenuItems.length - menuItemIndex) % this.totalMenuItems.length) + 1);
    });
    console.log(this.menuItemIndices);
  }

  getAnyPointInSquareInsideCircle(angle: number) {
    var denominator = Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle));
    var pointX = Math.cos(angle) / denominator;
    var pointY = Math.sin(angle) / denominator;
    this.points.push({
      pointX: pointX,
      pointY: pointY,
      angle: angle,
      _transform_: 'translate(' + (pointX * 200 + 200) + 'px, ' + (pointY * 200 + 200) + 'px)'
    });
  }

  getBezierPoint(tConstant: number, xPoints: number[], yPoints: number[]) {
    var pointX = this.getBezierCoordinate(tConstant, 0, xPoints.length - 1, xPoints);
    var pointY = this.getBezierCoordinate(tConstant, 0, yPoints.length - 1, yPoints);

    return {
      pointX: pointX,
      pointY: pointY,
      _transform_: 'translate(' + pointX + 'px, ' + pointY + 'px)'
    };
  }
        
  getBezierCoordinate(tConstant: number, i: number, n: number, xOrYPoints: number[])
  {
    if (i > n) return 0;
    return this.getBezierCoordinate(tConstant, i + 1, n, xOrYPoints) +
      (xOrYPoints[i] * Math.pow(1.0 - tConstant, n - i) * (i != 0 && i != n ? n : 1) * Math.pow(tConstant, i));
  }
}
