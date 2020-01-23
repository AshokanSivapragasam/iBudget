import { Component } from '@angular/core';
import { Filesystem } from '@ionic-enterprise/filesystem/ngx';
import { Directories } from '@ionic-enterprise/filesystem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { ExpenseModel } from '../models/expense.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
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

  expenseModel: ExpenseModel;

  customActionSheetOptions: any = {
    header: 'Diversity in payment',
    subHeader: 'Select area of payment'
  };

  expenseModels: ExpenseModel[];

  expenseFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private commonService: CommonService) {
    this.expenseFormGroup = formBuilder.group({
      areaOfPayment: ['', Validators.required],
      itemOrService: ['', Validators.required],
      modeOfPayment: ['', Validators.required],
      howMuchMoney: [1, Validators.required]
    });
  }

  getItemsOrServices(are: any) {
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
  }

  addExpense() {
    this.expenseModel = {
      areaOfPayment: this.expenseFormGroup.value.areaOfPayment,
      itemOrService: this.expenseFormGroup.value.itemOrService,
      modeOfPayment: this.expenseFormGroup.value.modeOfPayment,
      howMuchMoney: this.expenseFormGroup.value.howMuchMoney
    }
    this.commonService.expenseModels.push(this.expenseModel);
    console.log(this.commonService.expenseModels.length);
    console.log(JSON.stringify(this.expenseModel));
  }
}
