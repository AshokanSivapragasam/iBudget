import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { ExpenseModel } from '../models/expense.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentDatetime: string = '';
  areaOfPaymentOptions: string[] = ['Food', 'Shelter', 'Clothing', 'Travel', 'Entertainment', 'Medical', 'Personal', 'One stop market'];
  itemOrServiceOptions: string[];
  oneStopMarketOptions: string[] = ['More', 'Veg Market'];
  foodItemExpenseOptions: string[] = ['Milk', 'Zomato', 'Vegetables', 'Non-vegatables', 'Groceries', 'Fruits', 'Bakeries', 'Biscuits'];
  shelterExpenseOptions: string[] = ['House rent', 'Water bill', 'Electricity bill'];
  clothingExpenseOptions: string[] = ['Man', 'Woman'];
  travelExpenseOptions: string[] = ['Car water wash', 'Car diesel', 'Hotels', 'Ksrtc', 'Irctc', 'Ola Cab', 'Ola Auto', 'Daily shuttle', 'Toll', 'Parking'];
  entertainmentExpenseOptions: string[] = ['Cable', 'Internet', 'Movies'];
  medicalExpenseOptions: string[] = ['Cmc', 'Sanitary'];
  personalExpenseOptions: string[] = ['Giving', 'Debt'];
  modeOfPaymentOptions: string[] = ['Cash', 'Gpay', 'NetBanking', 'Paytm'];
  currencyTypeOptions: string[] = ['INR', 'USD'];

  expenseModel: ExpenseModel;

  customActionSheetOptions: any = {
    header: 'Diversity in payment',
    subHeader: 'Select area of payment'
  };

  expenseModels: ExpenseModel[];

  expenseFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private commonService: CommonService,
              private datePicker: DatePicker,
              private file: File,
              private fileChooser: FileChooser,
              private datePipe: DatePipe) {
    this.expenseFormGroup = formBuilder.group({
      areaOfPayment: [this.areaOfPaymentOptions[0], Validators.required],
      itemOrService: [this.foodItemExpenseOptions[0], Validators.required],
      modeOfPayment: [this.modeOfPaymentOptions[0], Validators.required],
      howMuchMoney: [12.45, Validators.required],
      currencyType: [this.currencyTypeOptions[0], Validators.required],
      transactionDatetime: ['', Validators.required],
      transactionNotes: ['']
    });

    console.log(this.file.dataDirectory);

    this.file.writeFile('.', '_file_.jon', '{"a": "b"}');
  }

  ngOnInit() {
    this.getItemsOrServices(undefined);
    this.currentDatetime = this.datePipe.transform(new Date(), "yyyy-MM-ddTHH");
    var minutePartRoundedTo15Mins = (Math.floor((new Date()).getMinutes() / 15) * 15);
    this.currentDatetime += ':' + (minutePartRoundedTo15Mins < 10 ? '0' : '') + minutePartRoundedTo15Mins;
    console.log(this.currentDatetime);
    this.expenseFormGroup.patchValue({
      transactionDatetime: this.currentDatetime
    });
  }

  getItemsOrServices(area: any) {
    switch (this.expenseFormGroup.value.areaOfPayment) {
      case 'Food':
        this.itemOrServiceOptions = this.foodItemExpenseOptions;
        break;
      case 'Shelter':
        this.itemOrServiceOptions = this.shelterExpenseOptions;
        break;
      case 'Clothing':
        this.itemOrServiceOptions = this.clothingExpenseOptions;
        break;
      case 'Travel':
        this.itemOrServiceOptions = this.travelExpenseOptions;
        break;
      case 'Entertainment':
        this.itemOrServiceOptions = this.entertainmentExpenseOptions;
        break;
      case 'Medical':
        this.itemOrServiceOptions = this.medicalExpenseOptions;
        break;
      case 'One stop market':
        this.itemOrServiceOptions = this.oneStopMarketOptions;
        break;
      default:
        this.itemOrServiceOptions = this.personalExpenseOptions;
        break;
    }
    
    this.expenseFormGroup.patchValue({
      itemOrService: this.itemOrServiceOptions[0]
    });
  }

  addExpense() {
    this.expenseModel = {
      id: this.commonService.expenseModels.length === 0 ? 1 : this.commonService.expenseModels[this.commonService.expenseModels.length - 1].id + 1, 
      areaOfPayment: this.expenseFormGroup.value.areaOfPayment,
      itemOrService: this.expenseFormGroup.value.itemOrService,
      modeOfPayment: this.expenseFormGroup.value.modeOfPayment,
      howMuchMoney: this.expenseFormGroup.value.howMuchMoney,
      currencyType: this.expenseFormGroup.value.currencyType,
      transactionDatetime: this.expenseFormGroup.value.transactionDatetime,
      transactionNotes: this.expenseFormGroup.value.transactionNotes
    }
    this.commonService.expenseModels.push(this.expenseModel);
    console.log(this.commonService.expenseModels.length);
    console.log(JSON.stringify(this.expenseModel));
  }
}
