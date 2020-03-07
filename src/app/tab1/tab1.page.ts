import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { SqliteStorageService } from '../services/sqlite-storage/sqlite-storage.service';
import { ExpenseModel } from '../models/expense.model';
import { IncomeModel } from '../models/income.model';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NodeModel } from '../models/node.model';
import { CalendarComponentOptions, CalendarModalOptions, CalendarResult, CalendarModal } from 'ion2-calendar';
import { File } from '@ionic-native/file/ngx';
import { SdCardFileService } from '../services/sd-card-file/sd-card-file.service';
import { MessageService } from '../services/message/message.service';

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

  dateRange: { from: string; to: string; };
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'

  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    from: new Date('2020-02-01'),
    to: Date.now()
  };

  nodeModel: NodeModel = {
    title:  'Root',
    level: -1,
    sumOfMoney: 0,
    currencyType: 'INR',
    modeOfPayment: 'Cash',
    childrenNodes: [],
    tracePath: '0',
    collapse: true
  };
  keyProperties: string[] = ['transactionDatetime', 'areaOfPayment', 'itemOrService', 'modeOfPayment'];

  subscribeCloseButton: any;
  constructor(private router: Router,
              private commonService: CommonService,
              private platform: Platform,
              private sqliteStorageService: SqliteStorageService,
              public navController: NavController,
              public modalCtrl: ModalController,
              private file: File,
              private sdCardFileService: SdCardFileService,
              private messageService: MessageService) {
    this.subscribeCloseButton = this.platform.backButton.subscribeWithPriority(787787, () => {
      if(window.confirm("Are you sure that want to close this app?")) {
        navigator['app'].exitApp();
      }
    });
  }

  async ionViewWillEnter() {
    this.nodeModel = {
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
    //await this.openCalendarAsync();
    this.getAllIncomesFromDb();
    this.getAllExpensesFromDb();
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

    /*console.log("Starting..");
    await this.sqliteStorageService.exportDbToJsonAsync()
    .then(_createTableMessage_ => console.log(_createTableMessage_));
    console.log("Exiting..");*/
  }

  async buttonAsync() {
    console.log("Starting..");
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
    await this.sqliteStorageService.importDataToExpenseTypesAsync()
    .then(_createTableMessage_ => {
      console.log(_createTableMessage_);
      this.messageService.add(_createTableMessage_);
    });
    /*await this.sqliteStorageService.importDataToDbAsync()
    .then(_createTableMessage_ => {
      console.log(_createTableMessage_);
      this.messageService.add(_createTableMessage_);
    });*/
  }

  async openCalendarAsync() {
    const calendarModalOptions: CalendarModalOptions = {
      title: 'Date Range',
      pickMode: 'range',
      from: new Date('2020-02-01'),
      to: Date.now()
    };

    const dateRangeCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { calendarModalOptions }
    });

    dateRangeCalendar.present();

    const event: any = await dateRangeCalendar.onDidDismiss();
    const date: any = event.data;
    console.log(date.from.string + ' | ' + date.to.string);
  }

  buildTrie() {
    console.log('Building Trie..');
    this.messageService.add('Building Trie..');
    try {
      this.buildTrieImplementation(this.nodeModel, this.nodeModel, 0, 0);
    } catch (ex) {
      console.log('Exception: ' + JSON.stringify(ex));
      this.messageService.add('Exception: ' + JSON.stringify(ex));
    }
    console.log('Built Trie..');
    this.messageService.add('Built Trie..');
  }

  buildTrieImplementation(originalNodeModel: NodeModel, nodeModel: NodeModel, rowIndex: number, columnIndex: number) {
    if (rowIndex == this.expenseModels.length) {
      nodeModel.sumOfMoney += this.expenseModels[rowIndex - 1]["howMuchMoney"];
      nodeModel.expenseModelId = this.expenseModels[rowIndex - 1]["id"];
      return;
    }
    else if (columnIndex == 0) { 
      nodeModel.sumOfMoney += this.expenseModels[rowIndex > 0? rowIndex - 1: rowIndex]["howMuchMoney"];
      nodeModel.expenseModelId = this.expenseModels[rowIndex > 0? rowIndex - 1: rowIndex]["id"];
      nodeModel = originalNodeModel;
    }
    
    nodeModel.sumOfMoney += this.expenseModels[rowIndex]["howMuchMoney"];
    //nodeModel.tracePath += ' + ' + this.expenseModels[rowIndex]["howMuchMoney"];
    nodeModel.level = columnIndex;
    let _title_ = this.expenseModels[rowIndex][this.keyProperties[columnIndex]];
    _title_ = columnIndex == 0 ? this.getFormattedDate(_title_): _title_;
    let _nodeModel_ = nodeModel.childrenNodes.find(r => r.title == _title_);
    if (_nodeModel_ == null)
    {
      _nodeModel_ = {
        title: _title_,
        childrenNodes: [],
        level: columnIndex + 1,
        sumOfMoney: 0,
        currencyType: this.expenseModels[rowIndex]['currencyType'],
        modeOfPayment: this.expenseModels[rowIndex]['modeOfPayment'],
        tracePath: '0',
        collapse: true
      };

      nodeModel.childrenNodes.push(_nodeModel_);
    }
    
    this.buildTrieImplementation(originalNodeModel, _nodeModel_, rowIndex += columnIndex == this.keyProperties.length - 1 ? 1 : 0, columnIndex += columnIndex == this.keyProperties.length - 1 ? -1 * columnIndex : 1);
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

      let _messageText_: string = 'Path: ' + this.file.externalDataDirectory + '/_expt_income_.json';
      this.sdCardFileService.writeFile(this.file.externalDataDirectory, '_expt_income_.json', JSON.stringify(this.incomeModels)).then(_ => {
        console.log('File write success! ' + _messageText_);
        this.messageService.add('File write success! ' + _messageText_);
      }).catch((reason) => {
        console.log('File write failed! ' + _messageText_);
        this.messageService.add('File write failed! ' + _messageText_);
      });
    });
  }

  getAllExpensesFromDb() {
    this.sqliteStorageService.getAllExpensesFromDbAsync('')
    .then(_expenseModels_ => {
      this.expenseModels = _expenseModels_;
      this.buildTrie();

      let _messageText_: string = 'Path: ' + this.file.externalDataDirectory + '/_expt_expense_.json';
      this.sdCardFileService.writeFile(this.file.externalDataDirectory, '_expt_expense_.json', JSON.stringify(this.expenseModels)).then(_ => {
        console.log('File write success! ' + _messageText_);
        this.messageService.add('File write success! ' + _messageText_);
      }).catch((reason) => {
        console.log('File write failed! ' + _messageText_);
        this.messageService.add('File write failed! ' + _messageText_);
      });
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
}
