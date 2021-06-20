import { Component } from '@angular/core';
import { IncomeModel } from '../models/income.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { DatePipe } from '@angular/common';
import { SqliteStorageService } from '../services/sqlite-storage/sqlite-storage.service';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  incomeSourceOptions: string[] = ['Salary', 'Wallet', 'EdenRed'];
  currencyTypeOptions: string[] = ['INR', 'USD'];
  
  incomeModel: IncomeModel;
  incomeModels: IncomeModel[];
  incomeFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private commonService: CommonService,
              private file: File,
              private datePipe: DatePipe,
              private sqliteStorageService: SqliteStorageService) {
    this.incomeFormGroup = formBuilder.group({
      incomeSource: [this.incomeSourceOptions[0], Validators.required],
      howMuchMoney: [84525, Validators.required],
      currencyType: [this.currencyTypeOptions[0], Validators.required],
      transactionDatetime: ['', Validators.required],
      transactionNotes: ['']
    });
    
    this.file.writeFile('.', '_file_.json', '{"a": "b"}');
  }

  ngOnInit() {
    let currentDatetime = this.datePipe.transform(new Date(), "yyyy-MM-ddTHH");
    var minutePartRoundedTo15Mins = (Math.floor((new Date()).getMinutes() / 15) * 15);
    currentDatetime += ':' + (minutePartRoundedTo15Mins < 10 ? '0' : '') + minutePartRoundedTo15Mins;
    console.log(currentDatetime);
    this.incomeFormGroup.patchValue({
      transactionDatetime: currentDatetime
    });
  }

  addIncome() {
    this.incomeModel = {
      id: 0,
      incomeSource: this.incomeFormGroup.value.incomeSource,
      howMuchMoney: this.incomeFormGroup.value.howMuchMoney,
      currencyType: this.incomeFormGroup.value.currencyType,
      transactionDatetime: this.incomeFormGroup.value.transactionDatetime,
      transactionNotes: this.incomeFormGroup.value.transactionNotes
    }
    
    this.sqliteStorageService.addIncomeToDbAsync(this.incomeModel)
    .then(insertMessageText => console.log(insertMessageText));
  }
}
