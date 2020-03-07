import { Component, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { SqliteStorageService } from '../services/sqlite-storage/sqlite-storage.service';
import { ExpenseModel } from '../models/expense.model';
import { ExpenseTypeModel } from '../models/expense-type.model';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentDatetime: string = '';
  areaOfPaymentOptions: string[] = [];//['Food', 'Vegetables', 'Non-vegetables', 'Fruits', 'Shelter', 'Clothing', 'Travel', 'Entertainment', 'Medical', 'Personal', 'O-s-m:More', 'Grooming', 'ExclusiveBuy'];
  exclusiveBuyOptions: string[] = ['Books', 'Ear-rings'];
  groomingOptions: string[] = ['Haircut'];
  vegetablesOptions: string[] = ['Garland', 'Big Onions', 'Small Onions', 'Carrot', 'Garlic', 'Ginger', 'Lady\'s Finger', 'Sau-sau', 'Karanai', 'Ridge Guard', 'Snake Guard', 'Bitter Guard', 'Potato', 'Sweet Potato', 'Tomato', 'Brinjal', 'Beans', 'Radish', 'Beetroot', 'Avarai', 'Curry Leaves', 'Chilly', 'Coconuts', 'Banana-flower', 'Banana-stem', 'Maize', 'Pudina', 'Keerai', 'Moringa', 'Carry Bag'];
  nonVegetablesOptions: string[] = ['Chicken', 'Mutton', 'Fish', 'Eggs'];
  groceryOptions: string[] = ['Rice', 'Groundnuts', 'Fenugreek', 'Mustard', 'Asafoetida', 'Ariel', 'Comfort', 'Dettol', 'Detergent', 'Cinthol', 'Jaggery', 'Toothbrush', 'GnutOil', 'Maida', 'Rawa', 'Sugar', 'Phenyl', 'VimGel', 'ExoBar', 'CrystalSalt', 'Salt', 'SesameOil', 'SesameSeeds', 'Atta', 'KitchenUtensils', 'DrawingTools', 'Ragi Flour', 'Kadalai Flour', 'Pottu Kadalai'];
  fruitsOptions: string[] = ['Banana', 'Kamala Orange', 'Orange', 'Green Grapes', 'Black Grapes', 'Pomogrenate', 'Apple', 'Red Plums', 'Mango', 'Sapota', 'Guava'];
  foodItemExpenseOptions: string[] = ['Milk', 'Zomato', 'Groceries', 'Fruits', 'Bakeries', 'Biscuits', 'Hotel'];
  shelterExpenseOptions: string[] = ['House rent', 'Water bill', 'Electricity bill'];
  clothingExpenseOptions: string[] = ['Man', 'Woman'];
  travelExpenseOptions: string[] = ['Car water wash', 'Car diesel', 'Hotels', 'Ksrtc', 'Irctc', 'Ola Cab', 'Ola Auto', 'Daily shuttle', 'Toll', 'Parking'];
  entertainmentExpenseOptions: string[] = ['Cable', 'Internet', 'Movies', 'MobileTopup'];
  medicalExpenseOptions: string[] = ['Cmc', 'Sanitary', 'Consulting'];
  personalExpenseOptions: string[] = ['Giving', 'Debt'];
  modeOfPaymentOptions: string[] = ['Cash', 'Gpay', 'NetBanking', 'Paytm', 'Card'];
  currencyTypeOptions: string[] = ['INR', 'USD'];
  itemOrServiceOptions: string[] = this.foodItemExpenseOptions;
  oneStopMarketOptions: string[] = this.vegetablesOptions
                                    .concat(this.nonVegetablesOptions)
                                    .concat(this.fruitsOptions)
                                    .concat(this.groceryOptions);
  
  customActionSheetOptions: any = {
    header: 'Diversity in payment',
    subHeader: 'Select area of payment'
  };

  expenseFormGroup: FormGroup;
  messageText: string;
  queryParams: any;
  routeParams: any;
  expenseModelId: number;
  frequentExpenseTransactionId: number;
  recurrentExpenseModels: ExpenseModel[] = [];
  expenseTypeModels: ExpenseTypeModel[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private sqliteStorageService: SqliteStorageService,
              private datePipe: DatePipe,
              private messageService: MessageService,
              private cdr: ChangeDetectorRef) {
    this.expenseFormGroup = formBuilder.group({
      isPrivate: [false, Validators.required],
      areaOfPayment: ['', Validators.required],
      itemOrService: ['', Validators.required],
      modeOfPayment: [this.modeOfPaymentOptions[0], Validators.required],
      howMuchMoney: [22, Validators.required],
      currencyType: [this.currencyTypeOptions[0], Validators.required],
      transactionDatetime: ['', Validators.required],
      transactionNotes: ['']
    });

    this.queryParams = this.activatedRoute.snapshot.queryParams;
    this.routeParams = this.activatedRoute.snapshot.params;
    this.expenseModelId = this.routeParams.expenseModelId;
    this.frequentExpenseTransactionId = this.routeParams.frequentExpenseTransactionId;
  }

  async ionViewWillEnter() {
    await this.getAllExpenseTypesAsync();
    this.getFrequentExpenseTransactions();
    if (this.expenseModelId) {
      await this.getExpenseModelByIdAsync(this.expenseModelId);
    } else if(this.frequentExpenseTransactionId) {
      this.getExpenseModelByFrequentExpenseTransactionIdAsync(this.frequentExpenseTransactionId);
    } else {
      this.patchCurrentDatetime();
    }
  }

  patchCurrentDatetime() {
    this.currentDatetime = this.datePipe.transform(new Date(), "yyyy-MM-ddTHH");
    var minutePartRoundedTo15Mins = (Math.floor((new Date()).getMinutes() / 15) * 15);
    this.currentDatetime += ':' + (minutePartRoundedTo15Mins < 10 ? '0' : '') + minutePartRoundedTo15Mins;
    this.getItemsOrServices(undefined);
    this.expenseFormGroup.patchValue({
      transactionDatetime: this.currentDatetime
    });
  }

  async getExpenseModelByIdAsync(expenseModelId: number) {
    await this.sqliteStorageService.getExpenseByIdFromDbAsync(expenseModelId)
    .then(_expenseModel_ => {
      this.expenseFormGroup.patchValue({
        isPrivate: _expenseModel_.isPrivate,
        areaOfPayment: _expenseModel_.areaOfPayment,
        modeOfPayment: _expenseModel_.modeOfPayment,
        howMuchMoney: _expenseModel_.howMuchMoney,
        currencyType: _expenseModel_.currencyType,
        transactionDatetime: _expenseModel_.transactionDatetime,
        transactionNotes: _expenseModel_.transactionNotes
      });

      this.getItemsOrServices(_expenseModel_.itemOrService);
    });
  }
 
  async getExpenseModelByFrequentExpenseTransactionIdAsync(frequentExpenseTransactionId: number) {
    await this.sqliteStorageService.getExpenseByFrequentExpenseTransactionIdFromDbAsync(frequentExpenseTransactionId)
    .then(_expenseModel_ => {
      this.expenseFormGroup.patchValue({
        areaOfPayment: _expenseModel_.areaOfPayment,
        modeOfPayment: _expenseModel_.modeOfPayment,
        howMuchMoney: _expenseModel_.howMuchMoney,
        currencyType: _expenseModel_.currencyType,
        transactionDatetime: _expenseModel_.transactionDatetime,
        transactionNotes: _expenseModel_.transactionNotes
      });

      this.getItemsOrServices(_expenseModel_.itemOrService);
    });
  }

  getDistinctAreaOfPaymentOptions() {
    let areaOfPaymentOptionsWithDuplicates = this.expenseTypeModels.map(r => r.areaOfPayment);
    let uniqueAreaOfPaymentOptionsSet = new Set(areaOfPaymentOptionsWithDuplicates);
    this.areaOfPaymentOptions = Array.from(uniqueAreaOfPaymentOptionsSet.values());
    this.expenseFormGroup.patchValue({
      areaOfPayment: this.areaOfPaymentOptions[0]
    });

    this.getItemsOrServices(undefined);
  }

  getItemsOrServices(preSelectedItemOrServiceOption: string) {
    this.itemOrServiceOptions = this.expenseTypeModels.filter(r => r.areaOfPayment === this.expenseFormGroup.value.areaOfPayment).map(r => r.itemOrService);
    /*switch (this.expenseFormGroup.value.areaOfPayment) {
      case 'Food':
        this.itemOrServiceOptions = this.foodItemExpenseOptions;
        break;
      case 'Vegetables':
        this.itemOrServiceOptions = this.vegetablesOptions;
        break;
      case 'Non-vegetables':
        this.itemOrServiceOptions = this.nonVegetablesOptions;
        break;
      case 'Fruits':
        this.itemOrServiceOptions = this.fruitsOptions;
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
      case 'O-s-m:More':
        this.itemOrServiceOptions = this.oneStopMarketOptions;
        break;
      case 'Grooming':
        this.itemOrServiceOptions = this.groomingOptions;
        break;
      case 'ExclusiveBuy':
        this.itemOrServiceOptions = this.exclusiveBuyOptions;
        break;
      default:
        this.itemOrServiceOptions = this.personalExpenseOptions;
        break;
    }*/
    preSelectedItemOrServiceOption = preSelectedItemOrServiceOption ? preSelectedItemOrServiceOption : this.itemOrServiceOptions[0];

    if (this.expenseFormGroup.value.itemOrService !== preSelectedItemOrServiceOption) {
      this.expenseFormGroup.patchValue({
        itemOrService: preSelectedItemOrServiceOption
      });
    }
    this.cdr.detectChanges();
  }
  
  addExpense() {
    const expenseModel = {
      id: 0,
      isPrivate: this.expenseFormGroup.value.isPrivate,
      areaOfPayment: this.expenseFormGroup.value.areaOfPayment,
      itemOrService: this.expenseFormGroup.value.itemOrService,
      modeOfPayment: this.expenseFormGroup.value.modeOfPayment,
      howMuchMoney: this.expenseFormGroup.value.howMuchMoney,
      currencyType: this.expenseFormGroup.value.currencyType,
      transactionDatetime: this.expenseFormGroup.value.transactionDatetime,
      transactionNotes: this.expenseFormGroup.value.transactionNotes
    }

    this.sqliteStorageService.addExpenseToDbAsync(expenseModel)
    .then(insertMessageText => {
      console.log(insertMessageText);
      this.messageService.add(insertMessageText);
    });
  }

  editExpense(expenseModelId: number) {
    const expenseModel = {
      id: expenseModelId,
      isPrivate: this.expenseFormGroup.value.isPrivate,
      areaOfPayment: this.expenseFormGroup.value.areaOfPayment,
      itemOrService: this.expenseFormGroup.value.itemOrService,
      modeOfPayment: this.expenseFormGroup.value.modeOfPayment,
      howMuchMoney: this.expenseFormGroup.value.howMuchMoney,
      currencyType: this.expenseFormGroup.value.currencyType,
      transactionDatetime: this.expenseFormGroup.value.transactionDatetime,
      transactionNotes: this.expenseFormGroup.value.transactionNotes
    }

    this.sqliteStorageService.updateExpenseAtDbAsync(expenseModel)
    .then(updateMessageText => {
      console.log(updateMessageText);
      this.messageService.add(updateMessageText);
    });
  }

  getFrequentExpenseTransactions() {
    this.sqliteStorageService.getFreqTop5ExpensesFromDbAsync()
    .then(_expenseModels_ => {
      this.recurrentExpenseModels = _expenseModels_;
    });
  }

  async getAllExpenseTypesAsync() {
    await this.sqliteStorageService.getAllExpenseTypesFromDbAsync()
    .then(_expenseTypeModels_ => {
      this.expenseTypeModels = _expenseTypeModels_;
      this.getDistinctAreaOfPaymentOptions();
    });
  }

  fillFrequentExpenseModel(frequentExpenseTransactionId: number) {
    this.getExpenseModelByFrequentExpenseTransactionIdAsync(frequentExpenseTransactionId);
  }
}
