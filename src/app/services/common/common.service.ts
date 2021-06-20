import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private datePipe: DatePipe) { }

  public getUniqueMonths(_duplicateData_: any[], _datePipeFormat_: string, fieldName: string) {
    if(!_duplicateData_) return [];
    let _unique_months_ = [];
    let _transactionMonth_ = '';
    _duplicateData_.forEach(_duplicateItem_ => {
      _transactionMonth_ = this.datePipe.transform(_duplicateItem_[fieldName], _datePipeFormat_);
      if(!_unique_months_.find(_unique_month_ => _unique_month_ == _transactionMonth_)) {
        _unique_months_.push(_transactionMonth_);
      }
    });
    return _unique_months_;
  }

  public getPossibeMonths(_datePipeFormat_: string) {
    var _possibleMonths_ = [];
    var startDate = new Date(2020, 0, 1);
    while (startDate < new Date()) {
      _possibleMonths_.push(this.datePipe.transform(startDate, _datePipeFormat_));
      startDate.setMonth(startDate.getMonth() + 1);
    }

    return _possibleMonths_;
  }
}
