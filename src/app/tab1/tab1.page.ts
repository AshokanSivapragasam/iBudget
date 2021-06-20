import { Component } from '@angular/core';
import { CommonService } from '../services/common/common.service';
import { SqliteStorageService } from '../services/sqlite-storage/sqlite-storage.service';
import { ExpenseModel } from '../models/expense.model';
import { IncomeModel } from '../models/income.model';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NodeModel } from '../models/node.model';
import { CalendarComponentOptions, CalendarModalOptions, CalendarResult, CalendarModal, DayConfig } from 'ion2-calendar';
import { File } from '@ionic-native/file/ngx';
import { SdCardFileService } from '../services/sd-card-file/sd-card-file.service';
import { MessageService } from '../services/message/message.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {  
  totalSumOfMoneyAsIncome: number = 0;
  totalSumOfMoneyAsExpense: number = 0;
  incomeModels: IncomeModel[] = [];
  expenseModels: ExpenseModel[] = [];

  expenseNodeModel: NodeModel = {
    title:  'Root',
    level: -1,
    sumOfMoney: 0,
    currencyType: 'INR',
    modeOfPayment: 'Cash',
    childrenNodes: [],
    tracePath: '0',
    collapse: true
  };

  incomeNodeModel: NodeModel = {
    title:  'Root',
    level: -1,
    sumOfMoney: 0,
    currencyType: 'INR',
    modeOfPayment: 'Cash',
    childrenNodes: [],
    tracePath: '0',
    collapse: true
  };
  expenseKeyProperties: string[] = ['transactionMonth', 'transactionDatetime', 'areaOfPayment', 'itemOrService', 'modeOfPayment'];
  incomeKeyProperties: string[] = ['transactionMonth', 'transactionDatetime', 'incomeSource'];
  
  idx: number = 0;
  _datePipeFormat_ = 'MMM-y';
  monthOptions: string[] = [this.datePipe.transform(new Date(), this._datePipeFormat_)];
  monthOption: string = this.monthOptions[0];

  subscribeCloseButton: any;
  constructor(private router: Router,
              private commonService: CommonService,
              private platform: Platform,
              private sqliteStorageService: SqliteStorageService,
              public navController: NavController,
              public modalCtrl: ModalController,
              private file: File,
              private datePipe: DatePipe,
              private sdCardFileService: SdCardFileService,
              private messageService: MessageService) {
    this.subscribeCloseButton = this.platform.backButton.subscribeWithPriority(787787, () => {
      if(window.confirm("Are you sure that want to close this app?")) {
        navigator['app'].exitApp();
      }
    });
  }

  onChange($event) {
    console.log($event);
  }

  async ionViewWillEnter() {
    this.expenseNodeModel = {
      title:  'Root',
      level: -1,
      sumOfMoney: 0,
      currencyType: 'INR',
      modeOfPayment: 'Cash',
      childrenNodes: [],
      tracePath: '0',
      collapse: true
    };
    await this.bootstrapSqliteDbAsync();
    this.getAllExpensesFromDb();
    await this.delay(50);
    this.initIncomeNodeModel();
    this.getAllIncomesFromDb();
  }

  initExpenseModel() {
    this.expenseNodeModel = {
      title:  'Root',
      level: -1,
      sumOfMoney: 0,
      currencyType: 'INR',
      modeOfPayment: 'Cash',
      childrenNodes: [],
      tracePath: '0',
      collapse: true
    };
  }

  initIncomeNodeModel() {
    this.incomeNodeModel = {
      title:  'Root',
      level: -1,
      sumOfMoney: 0,
      currencyType: 'INR',
      modeOfPayment: 'Cash',
      childrenNodes: [],
      tracePath: '0',
      collapse: true
    };
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async bootstrapSqliteDbAsync() {
    await this.sqliteStorageService.createTableExpenseAtDbAsync()
    .then(_createTableMessage_ => {
      console.log(_createTableMessage_);
      this.messageService.add(_createTableMessage_);
    });

    await this.sqliteStorageService.createTableIncomeAtDbAsync()
    .then(_createTableMessage_ => {
      console.log(_createTableMessage_);
      this.messageService.add(_createTableMessage_);
    });

    await this.sqliteStorageService.createTableFrequentExpenseTransactionsAtDbAsync()
    .then(_createTableMessage_ => {
      console.log(_createTableMessage_);
      this.messageService.add(_createTableMessage_);
    });

    console.log("Starting..");
    await this.sqliteStorageService.exportDbToJsonAsync()
    .then(_createTableMessage_ => console.log(_createTableMessage_));
    console.log("Exiting..");
  }

  async buttonAsync() {
    console.log("Starting..");
    
    this.getAllIncomesFromDb();

    await this.sqliteStorageService.exportDbToJsonAsync()
    .then(_createTableMessage_ => {
      console.log(_createTableMessage_);
      this.messageService.add(_createTableMessage_);
    });
    console.log("Exiting..");
    await this.sqliteStorageService.createTableExpenseAtDbAsync()
    .then(_createTableMessage_ => {
      console.log(_createTableMessage_);
      this.messageService.add(_createTableMessage_);
    });
    await this.sqliteStorageService.createTableExpenseTypesAtDbAsync()
    .then(_createTableMessage_ => {
      console.log(_createTableMessage_);
      this.messageService.add(_createTableMessage_);
    });
    /*await this.sqliteStorageService.importDataToExpenseTypesAsync()
    .then(_createTableMessage_ => {
      console.log(_createTableMessage_);
      this.messageService.add(_createTableMessage_);
    });*/
    /*await this.sqliteStorageService.importDataToDbAsync()
    .then(_createTableMessage_ => {
      console.log(_createTableMessage_);
      this.messageService.add(_createTableMessage_);
    });*/
  }

  buildTrie(nodeModelSourceData: any[], keyProperties: string[], __nodeModel__: NodeModel) {
    console.log('Building Trie..');
    this.messageService.add('Building Trie..');
    try {
      this.buildTrieImplementation(nodeModelSourceData, keyProperties, __nodeModel__, __nodeModel__, 0, 0);
    } catch (ex) {
      console.log('BuildTrie | Exception: ' + JSON.stringify(ex.stack));
      this.messageService.add('BuildTrie | Exception: ' + JSON.stringify(ex.stack));
    }
    console.log('Built Trie..');
    this.messageService.add('Built Trie..');
  }

  buildTrieImplementation(nodeModelSourceData: any[], keyProperties: string[], originalNodeModel: NodeModel, nodeModel: NodeModel, rowIndex: number, columnIndex: number) {
    // Return when there is no transactions..
    if(nodeModelSourceData.length == 0) return;
    else if (rowIndex == nodeModelSourceData.length) {
      nodeModel.sumOfMoney += nodeModelSourceData[rowIndex - 1]["howMuchMoney"];
      nodeModel.expenseModelId = nodeModelSourceData[rowIndex - 1]["id"];
      if (nodeModelSourceData[0].itemOrService === this.expenseModels[0].itemOrService && this.expenseNodeModel.childrenNodes.length == 0) {
        this.expenseNodeModel =  originalNodeModel;
        this.initIncomeNodeModel();
      }
      else {
        this.incomeNodeModel = originalNodeModel;
      }
      return;
    }
    else if (columnIndex == 0) { 
      nodeModel.sumOfMoney += nodeModelSourceData[rowIndex > 0? rowIndex - 1: rowIndex]["howMuchMoney"];
      nodeModel.expenseModelId = nodeModelSourceData[rowIndex > 0? rowIndex - 1: rowIndex]["id"];
      nodeModel = originalNodeModel;
    }
    
    nodeModel.sumOfMoney += nodeModelSourceData[rowIndex]["howMuchMoney"];
    //nodeModel.tracePath += ' + ' + this.expenseModels[rowIndex]["howMuchMoney"];
    nodeModel.level = columnIndex;
    let _title_ = nodeModelSourceData[rowIndex][keyProperties[columnIndex]];
    _title_ = columnIndex == 1 ? this.getFormattedDate(_title_): _title_;
    let _nodeModel_ = nodeModel.childrenNodes.find(r => r.title == _title_);
    if (_nodeModel_ == null)
    {
      _nodeModel_ = {
        title: _title_,
        childrenNodes: [],
        level: columnIndex + 1,
        sumOfMoney: 0,
        currencyType: nodeModelSourceData[rowIndex]['currencyType'],
        modeOfPayment: nodeModelSourceData[rowIndex]['modeOfPayment'],
        tracePath: '0',
        collapse: true
      };

      nodeModel.childrenNodes.push(_nodeModel_);
    }
    
    this.buildTrieImplementation(nodeModelSourceData, keyProperties, originalNodeModel, _nodeModel_, rowIndex += columnIndex == keyProperties.length - 1 ? 1 : 0, columnIndex += columnIndex == keyProperties.length - 1 ? -1 * columnIndex : 1);
  }

  getFormattedDate(dateTime: string): string {
    const dayDictionary = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var dayIndex = new Date(dateTime).getDay();
    return dateTime.substring(0, 10) + ' (' + dayDictionary[dayIndex] + ')';
  }

  getAllIncomesFromDb() {
    this.sqliteStorageService.getAllIncomesFromDbAsync()
    .then(_incomeModels_ => {
      this.incomeModels = _incomeModels_;
      this.buildTrie(this.incomeModels, this.incomeKeyProperties, this.incomeNodeModel);

      /*let _messageText_: string = 'Path: ' + this.file.externalDataDirectory + '/_expt_income_.json';
      this.sdCardFileService.writeFile(this.file.externalDataDirectory, '_expt_income_.json', JSON.stringify(this.incomeModels)).then(_ => {
        console.log('File write success! ' + _messageText_);
        this.messageService.add('File write success!');
      }).catch((reason) => {
        console.log('File write failed! ' + _messageText_);
        this.messageService.add('File write failed!');
      });*/
    });
  }

  getAllExpensesFromDb() {
    this.sqliteStorageService.getAllExpensesFromDbAsync('')
    .then(_expenseModels_ => {
      this.expenseModels = _expenseModels_;
      //this.buildTrie(this.expenseModels, this.expenseKeyProperties, this.expenseNodeModel);
      //this.monthOptions = this.commonService.getUniqueMonths(this.expenseModels, this._datePipeFormat_, 'transactionDatetime');
      this.monthOptions = this.commonService.getPossibeMonths(this._datePipeFormat_);
      this.monthOptions = this.monthOptions.length === 0 ? [this.datePipe.transform(new Date(), this._datePipeFormat_)]: this.monthOptions;
      this.idx = this.monthOptions.length === 0 ? 0 : this.monthOptions.length - 1; 
      this.displayScopedResults();

      /*let _messageText_: string = 'Path: ' + this.file.externalDataDirectory + '/_expt_expense_.json';
      this.sdCardFileService.writeFile(this.file.externalDataDirectory, '_expt_expense_.json', JSON.stringify(this.expenseModels)).then(_ => {
        console.log('File write success! ' + _messageText_);
        this.messageService.add('File write success!');
      }).catch((reason) => {
        console.log('File write failed! ' + _messageText_);
        this.messageService.add('File write failed!');
      });*/
    });
  }

  getRemainingSumOfMoney(): number {
    this.totalSumOfMoneyAsIncome = this.incomeModels.reduce((_totalSum_, _currentIncomeModel_) => _totalSum_ + _currentIncomeModel_.howMuchMoney, 0);
    this.totalSumOfMoneyAsExpense = this.expenseModels.reduce((_totalSum_, _currentExpenseModel_) => _totalSum_ + _currentExpenseModel_.howMuchMoney, 0);
    return this.totalSumOfMoneyAsIncome - this.totalSumOfMoneyAsExpense;
  }

  updateExpenseAtDb(expenseModelId: number) {
    this.router.navigate(['/tabs/tab2', expenseModelId]);
  }

  updateIncomeAtDb(incomeModel: IncomeModel) {
    this.sqliteStorageService.updateIncomeAtDbAsync(incomeModel)
    .then(_updateMessageText_ => {
      console.log(_updateMessageText_);
      this.messageService.add(_updateMessageText_);
      this.getAllIncomesFromDb();
    });
  }

  deleteIncomeTransaction(index: number) {
    this.sqliteStorageService.deleteIncomeFromDbAsync(index)
    .then(_deleteMessageText_ => {
        console.log(_deleteMessageText_);
        this.messageService.add(_deleteMessageText_);
        this.incomeModels = this.incomeModels.filter(incomeModel => incomeModel.id != index);
      });
  }
  
  deleteExpenseTransaction(index: number) {
    this.sqliteStorageService.deleteExpenseFromDbAsync(index)
    .then(_deleteMessageText_ => {
      console.log(_deleteMessageText_);
      this.messageService.add(_deleteMessageText_);
      this.expenseModels = this.expenseModels.filter(expenseModel => expenseModel.id != index);
    });
  }

  goBack() {
    this.idx -= (this.idx > 0 ? 1: 0);
    this.monthOption = this.monthOptions[this.idx];
    this.displayScopedResults();
  }

  fire() {
    this.idx = this.monthOptions.findIndex(x => x == this.monthOption);
    this.displayScopedResults();
  }

  goForward() {
    this.idx += (this.idx < this.monthOptions.length - 1 ? 1: 0);
    this.monthOption = this.monthOptions[this.idx];
    this.displayScopedResults();
  }

  displayScopedResults() {
    let _filteredExpenseModels_ = this.expenseModels.filter(r => this.datePipe.transform(r.transactionDatetime, this._datePipeFormat_) == this.monthOption);
    this.initExpenseModel();
    this.buildTrie(_filteredExpenseModels_, this.expenseKeyProperties, this.expenseNodeModel);
  }
}
