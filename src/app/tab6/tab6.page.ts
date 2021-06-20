import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { SortModel } from '../models/sort.model';
import { SqliteStorageService } from '../services/sqlite-storage/sqlite-storage.service';
import { MessageService } from '../services/message/message.service';
import { Observable, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss']
})
export class Tab6Page implements AfterViewInit {
  every30MilliSecondSubscription01: Subscription;
  every30MilliSecondSubscription02: Subscription;
  every30MilliSecondSubscription03: Subscription;
  every30MilliSecondSubscription04: Subscription;
  every30MilliSecond: Observable<number> = timer(0, 10);
  
  listOfIntegers01: SortModel[] = [];
  listOfIntegers02: SortModel[] = [];
  listOfIntegers03: SortModel[] = [];
  listOfIntegers04: SortModel[] = [];
  history: SortModel[][] = [];

  constructor() {
  }

  ngAfterViewInit() {
    this.listOfIntegers01 = Array.from(Array(680).keys()).map(_integer_ => ({
      color: 'rgb(' + this.getRandomInteger(255) + ', ' + this.getRandomInteger(255) + ', ' + this.getRandomInteger(255) + ')',
      integer: _integer_
    }));
    this.listOfIntegers01 = this.shuffleArray(this.listOfIntegers01);
    this.listOfIntegers02 = [...this.listOfIntegers01];
    this.listOfIntegers03 = [...this.listOfIntegers01];
    this.listOfIntegers04 = [...this.listOfIntegers01];

    this.bubbleSort(this.listOfIntegers01);
    this.selectionSort(this.listOfIntegers02);
    this.insertionSort(this.listOfIntegers03);
    this.mergeSort(this.listOfIntegers04, 0, this.listOfIntegers04.length - 1);

    var idx = 0;
    this.every30MilliSecondSubscription04 = this.every30MilliSecond.subscribe(second => {
      this.listOfIntegers04 = this.history[idx];
      idx += 1;
      if(idx >= this.history.length) this.every30MilliSecondSubscription04.unsubscribe();
    });
  }

  ionViewWillEnter() {
  }

  mergeSort(listOfIntegers: SortModel[], left: number, right: number) {
    if (left < right) {
      var middle = Math.floor((left + right) / 2);
      this.mergeSort(listOfIntegers, left, middle);
      this.mergeSort(listOfIntegers, middle + 1, right);
      this.merge(listOfIntegers, left, middle, right);
      
      this.history.push([...listOfIntegers]);
    }
  }

  merge(listOfIntegers: SortModel[], left: number, middle: number, right: number) {
      var leftPtr = left;
      var rightPtr = middle + 1;
      var tempArray : SortModel[] = Array.from(Array(right - left + 1).keys()).map(_integer_ => ({
        color: 'rgb(' + this.getRandomInteger(255) + ', ' + this.getRandomInteger(255) + ', ' + this.getRandomInteger(255) + ')',
        integer: _integer_
      }));
      var currentPtr = 0;
      while (leftPtr <= middle && rightPtr <= right) {
        if (listOfIntegers[leftPtr].integer < listOfIntegers[rightPtr].integer) {
            tempArray[currentPtr] = listOfIntegers[leftPtr];
            currentPtr += 1;
            leftPtr += 1;
            continue;
        }
        tempArray[currentPtr] = listOfIntegers[rightPtr];
        currentPtr += 1;
        rightPtr += 1;
      }

      while (leftPtr <= middle) {
        tempArray[currentPtr] = listOfIntegers[leftPtr];
        currentPtr += 1;
        leftPtr += 1;
      }

      while (rightPtr <= right) {
        tempArray[currentPtr] = listOfIntegers[rightPtr];
        currentPtr += 1;
        rightPtr += 1;
      }

      currentPtr = 0;
      tempArray.forEach((tempItem, idx) => {
        listOfIntegers[left + currentPtr] = tempItem;
        currentPtr += 1;
      });
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
      idx += 1;
      if(idx >= listOfIntegers.length) this.every30MilliSecondSubscription01.unsubscribe();
    });
  }

  swap(listOfIntegers: SortModel[], idx: number, idy: number) {
    var temp = listOfIntegers[idx];
    listOfIntegers[idx] = listOfIntegers[idy];
    listOfIntegers[idy] = temp;
  }

  shuffleArray(array: SortModel[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  getRandomInteger(maxRange: number) {
    return Math.floor((Math.random() * maxRange) + 1);
  }
}
