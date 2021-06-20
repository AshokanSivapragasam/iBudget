import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';
import { ExpenseModel } from 'src/app/models/expense.model';
import { IncomeModel } from 'src/app/models/income.model';
import { ExpenseTypeModel } from 'src/app/models/expense-type.model';
import { DatePipe } from '@angular/common';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class SqliteStorageService {

  constructor(private sqlite: SQLite,
              private sqlitePorter: SQLitePorter,
              private datepipe: DatePipe,
              private sqliteDbCopy: SqliteDbCopy,
              private messageService: MessageService) {
  }

  async exportDbToJsonAsync(): Promise<string> {
    var createTableMessageText: string = '';
    
    await this.sqliteDbCopy.copy('ionicdb.db', 0)
    .then(_reponse_ => console.log("SqliteDbCopy | Success | " + _reponse_))
    .catch(_error_ => console.log("SqliteDbCopy | Fail | " + _error_));

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      this.sqlitePorter.exportDbToJson(db)
      .then(_response_ => { console.log("sqlitePorter.exportDbToJson | Success | " + _response_); createTableMessageText = _response_; })
      .catch(reason => console.log("sqlitePorter.exportDbToJson | Catch01 | " + reason));
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); createTableMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return createTableMessageText;
  }

  async importDataToDbAsync(): Promise<string> {
    var records = 'INSERT INTO Expense (areaOfPayment,itemOrService,modeOfPayment,howMuchMoney,currencyType,transactionDatetime,transactionNotes)VALUES(\'Food\',\'Hotel\',\'Cash\',\'76\',\'INR\',\'2020-02-01T16:30:00+05:30\',\'\'),(\'Food\',\'Hotel\',\'Card\',\'375\',\'INR\',\'2020-02-01T16:30:00+05:30\',\'HSB\'),(\'Travel\',\'Ola Auto\',\'Card\',\'40\',\'INR\',\'2020-02-01T16:30:00+05:30\',\'HSB\'),(\'Travel\',\'Hotels\',\'Cash\',\'1300\',\'INR\',\'2020-02-01T16:30:00+05:30\',\'\'),(\'Food\',\'Milk\',\'Cash\',\'22\',\'INR\',\'2020-02-01T16:30:00+05:30\',\'\'),(\'Food\',\'Fruits\',\'Cash\',\'20\',\'INR\',\'2020-02-01T16:30:00+05:30\',\'Banana\'),(\'Food\',\'Milk\',\'Cash\',\'20\',\'INR\',\'2020-02-02T16:30:00+05:30\',\'Tea\'),(\'Food\',\'Hotel\',\'Cash\',\'115\',\'INR\',\'2020-02-02T16:30:00+05:30\',\'Dinner\'),(\'Travel\',\'Ola Cab\',\'Gpay\',\'320\',\'INR\',\'2020-02-02T16:30:00+05:30\',\'\'),(\'Travel\',\'Ola Auto\',\'Cash\',\'130\',\'INR\',\'2020-02-02T16:30:00+05:30\',\'\'),(\'Food\',\'Milk\',\'Cash\',\'22\',\'INR\',\'2020-02-02T17:30:00+05:30\',\'\'),(\'Non-vegetables\',\'Eggs\',\'Gpay\',\'60\',\'INR\',\'2020-02-02T17:30:00+05:30\',\'Eggs\'),(\'Food\',\'Biscuits\',\'Gpay\',\'10\',\'INR\',\'2020-02-02T17:30:00+05:30\',\'Chocolates\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-03T10:30:00+05:30\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-03T18:00:00+05:30\',\'\'),(\'Food\',\'Milk\',\'Cash\',\'22\',\'INR\',\'2020-02-03T18:15:00+05:30\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-04T19:45\',\'\'),(\'Food\',\'Milk\',\'Cash\',\'22\',\'INR\',\'2020-02-04T19:45\',\'\'),(\'Vegetables\',\'Tomato\',\'Cash\',\'17.3\',\'INR\',\'2020-02-04T21:00\',\'\'),(\'Vegetables\',\'Carrot\',\'Cash\',\'32.4\',\'INR\',\'2020-02-04T21:00\',\'\'),(\'Vegetables\',\'Big Onions\',\'Cash\',\'41.75\',\'INR\',\'2020-02-04T21:00\',\'\'),(\'Vegetables\',\'Beans\',\'Cash\',\'12\',\'INR\',\'2020-02-04T21:00\',\'\'),(\'Vegetables\',\'Curry Leaves\',\'Cash\',\'10\',\'INR\',\'2020-02-04T21:00\',\'\'),(\'Vegetables\',\'Chilly\',\'Cash\',\'5\',\'INR\',\'2020-02-04T21:00\',\'\'),(\'Vegetables\',\'Carry Bag\',\'Cash\',\'10\',\'INR\',\'2020-02-04T21:00\',\'\'),(\'Food\',\'Hotel\',\'Gpay\',\'40\',\'INR\',\'2020-02-04T21:00\',\'Chappathi, Buttermilk\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-04T18:00:03.275+05:30\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-05T10:45:00+05:30\',\'\'),(\'Vegetables\',\'Big Onions\',\'Cash\',\'50\',\'INR\',\'2020-02-05T16:00\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-05T12:00:00+05:30\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'\'),(\'Vegetables\',\'Small Onions\',\'Cash\',\'30\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'\'),(\'Vegetables\',\'Beetroot\',\'Cash\',\'30\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'\'),(\'Vegetables\',\'Radish\',\'Cash\',\'20\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'\'),(\'Vegetables\',\'Bitter Guard\',\'Cash\',\'10\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'\'),(\'Vegetables\',\'Ginger\',\'Cash\',\'10\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'\'),(\'Vegetables\',\'Garlic\',\'Cash\',\'60\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'\'),(\'Vegetables\',\'Garland\',\'Cash\',\'30\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'\'),(\'Vegetables\',\'Coconuts\',\'Cash\',\'50\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'\'),(\'Food\',\'Milk\',\'Cash\',\'22\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'\'),(\'Food\',\'Bakeries\',\'Cash\',\'50\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'Masala groundnuts\'),(\'Fruits\',\'Banana\',\'Cash\',\'65\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'\'),(\'Medical\',\'Cmc\',\'Gpay\',\'200\',\'INR\',\'2020-02-06T18:45:00+05:30\',\'Tablets\'),(\'Food\',\'Milk\',\'Cash\',\'22\',\'INR\',\'2020-02-07T18:00:00+05:30\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-07T18:00:00+05:30\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-07T10:45:00+05:30\',\'\'),(\'Personal\',\'Debt\',\'Cash\',\'500\',\'INR\',\'2020-02-07T10:45:00+05:30\',\'Shankar Hw\'),(\'Food\',\'Biscuits\',\'Cash\',\'50\',\'INR\',\'2020-02-07T19:00:00+05:30\',\'Britannia, Oreo, Bournvita\'),(\'Food\',\'Milk\',\'Cash\',\'22\',\'INR\',\'2020-02-08T17:15:00+05:30\',\'\'),(\'Non-vegetables\',\'Eggs\',\'Cash\',\'60\',\'INR\',\'2020-02-08T17:15:00+05:30\',\'\'),(\'Fruits\',\'Black Grapes\',\'Gpay\',\'110\',\'INR\',\'2020-02-09T12:00:00+05:30\',\'600 grams\'),(\'Vegetables\',\'Coconuts\',\'Gpay\',\'70\',\'INR\',\'2020-02-09T12:00:00+05:30\',\'2 tender coconuts\'),(\'O-s-m:More\',\'Snake Guard\',\'Cash\',\'5.49\',\'INR\',\'2020-02-09T16:45\',\'0.366kg\'),(\'O-s-m:More\',\'Ridge Guard\',\'Cash\',\'12.04\',\'INR\',\'2020-02-09T16:45\',\'0.415kg\'),(\'O-s-m:More\',\'Potato\',\'Cash\',\'24.8\',\'INR\',\'2020-02-09T16:45\',\'0.689kg\'),(\'O-s-m:More\',\'Tomato\',\'Cash\',\'5.74\',\'INR\',\'2020-02-09T16:45\',\'0.478kg\'),(\'O-s-m:More\',\'Brinjal\',\'Cash\',\'4.35\',\'INR\',\'2020-02-09T16:45\',\'0.229kg\'),(\'O-s-m:More\',\'Sweet Potato\',\'Cash\',\'18.96\',\'INR\',\'2020-02-09T16:45\',\'0.387kg\'),(\'O-s-m:More\',\'Carrot\',\'Cash\',\'14.7\',\'INR\',\'2020-02-09T16:45\',\'0.3kg\'),(\'O-s-m:More\',\'Orange\',\'Cash\',\'39.1\',\'INR\',\'2020-02-09T17:00\',\'0.798kg\'),(\'O-s-m:More\',\'Mutton\',\'Cash\',\'399.28\',\'INR\',\'2020-02-09T17:00\',\'0.553kg\'),(\'O-s-m:More\',\'CrystalSalt\',\'Card\',\'17.7\',\'INR\',\'2020-02-09T18:30\',\'\'),(\'O-s-m:More\',\'Jaggery\',\'Card\',\'75\',\'INR\',\'2020-02-09T18:30\',\'\'),(\'O-s-m:More\',\'Rawa\',\'Card\',\'26.95\',\'INR\',\'2020-02-09T18:30\',\'\'),(\'O-s-m:More\',\'Phenyl\',\'Card\',\'60\',\'INR\',\'2020-02-09T18:30\',\'\'),(\'O-s-m:More\',\'DrawingTools\',\'Card\',\'19.6\',\'INR\',\'2020-02-09T18:30\',\'Fevicol\'),(\'O-s-m:More\',\'DrawingTools\',\'Card\',\'34.3\',\'INR\',\'2020-02-09T18:30\',\'Glitter\'),(\'O-s-m:More\',\'Ariel\',\'Card\',\'225.4\',\'INR\',\'2020-02-09T18:30\',\'\'),(\'O-s-m:More\',\'DrawingTools\',\'Card\',\'20\',\'INR\',\'2020-02-09T18:30\',\'Candles\'),(\'O-s-m:More\',\'Mustard\',\'Card\',\'27\',\'INR\',\'2020-02-09T18:30\',\'\'),(\'O-s-m:More\',\'Asafoetida\',\'Card\',\'59\',\'INR\',\'2020-02-09T18:30\',\'\'),(\'O-s-m:More\',\'SesameSeeds\',\'Card\',\'40\',\'INR\',\'2020-02-09T18:30\',\'\'),(\'O-s-m:More\',\'Fenugreek\',\'Card\',\'35\',\'INR\',\'2020-02-09T18:30\',\'\'),(\'O-s-m:More\',\'Ragi Flour\',\'Card\',\'32.18\',\'INR\',\'2020-02-09T18:30\',\'\'),(\'O-s-m:More\',\'Maida\',\'Card\',\'49\',\'INR\',\'2020-02-09T18:45\',\'\'),(\'O-s-m:More\',\'Groundnuts\',\'Card\',\'35\',\'INR\',\'2020-02-09T18:45\',\'\'),(\'O-s-m:More\',\'DrawingTools\',\'Card\',\'19.6\',\'INR\',\'2020-02-09T18:45\',\'Fevicol\'),(\'Shelter\',\'House rent\',\'NetBanking\',\'13650\',\'INR\',\'2020-02-09T15:30:00+05:30\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-10T11:30:00+05:30\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-10T17:30:00+05:30\',\'\'),(\'Food\',\'Milk\',\'Cash\',\'22\',\'INR\',\'2020-02-10T17:30:00+05:30\',\'\'),(\'O-s-m:More\',\'GnutOil\',\'Cash\',\'110\',\'INR\',\'2020-02-10T18:30:00+05:30\',\'Vom\'),(\'Vegetables\',\'Big Onions\',\'Cash\',\'40\',\'INR\',\'2020-02-10T18:30:00+05:30\',\'\'),(\'Vegetables\',\'Carry Bag\',\'Cash\',\'5\',\'INR\',\'2020-02-10T18:30:00+05:30\',\'\'),(\'Personal\',\'Giving\',\'NetBanking\',\'2000\',\'INR\',\'2020-02-10T12:45:00+05:30\',\'V\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-11T10:30:00+05:30\',\'\'),(\'Food\',\'Hotel\',\'Cash\',\'50\',\'INR\',\'2020-02-11T13:30:00+05:30\',\'Lunch, ButterMilk, BoiledEgg\'),(\'Food\',\'Milk\',\'Gpay\',\'22\',\'INR\',\'2020-02-11T18:30:00+05:30\',\'\'),(\'Vegetables\',\'Small Onions\',\'Cash\',\'40\',\'INR\',\'2020-02-11T18:30:00+05:30\',\'\'),(\'Vegetables\',\'Chilly\',\'Cash\',\'10\',\'INR\',\'2020-02-11T18:30:00+05:30\',\'\'),(\'Vegetables\',\'Garlic\',\'Cash\',\'60\',\'INR\',\'2020-02-11T18:30:00+05:30\',\'\'),(\'Fruits\',\'Banana\',\'Cash\',\'80\',\'INR\',\'2020-02-11T18:30:00+05:30\',\'\'),(\'Entertainment\',\'Internet\',\'NetBanking\',\'943\',\'INR\',\'2020-02-11T15:30:00+05:30\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-11T18:00:13.814+05:30\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-12T11:00:38.904+05:30\',\'\'),(\'Medical\',\'Sanitary\',\'Cash\',\'60\',\'INR\',\'2020-02-12T18:45:22.074+05:30\',\'\'),(\'Food\',\'Milk\',\'Cash\',\'22\',\'INR\',\'2020-02-12T19:00:10.153+05:30\',\'\'),(\'Travel\',\'Daily shuttle\',\'Cash\',\'10\',\'INR\',\'2020-02-12T18:15:20.175+05:30\',\'\')';

    var importDataMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      await db.executeSql(records, [])
        .then(createTableResponse => {
          console.log('Imported the data successfully! ' + JSON.stringify(createTableResponse));
          importDataMessageText = 'Imported the data successfully! ' + JSON.stringify(createTableResponse);
        }).catch(e => { console.log('SvcException 2: ' + JSON.stringify(e)); importDataMessageText = 'SvcException 2: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); importDataMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return importDataMessageText;
  }

  async createTableExpenseTypesAtDbAsync(): Promise<string> {
    var createTableMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      var createTableSqlText = 'CREATE TABLE IF NOT EXISTS ExpenseTypes (id INTEGER PRIMARY KEY AUTOINCREMENT, areaOfPayment TEXT, itemOrService TEXT)';
      //createTableSqlText = 'ALTER TABLE ExpenseTypes ADD COLUMN IsPrivate INTEGER DEFAULT 0';
      //createTableSqlText = 'ALTER TABLE ExpenseTypes DROP COLUMN IsPrivate';
      await db.executeSql(createTableSqlText, [])
        .then(createTableResponse => {
          console.log('Table, "ExpenseTypes" created successfully!');
        }).catch(e => { console.log('SvcException 2: ' + JSON.stringify(e)); createTableMessageText = 'SvcException 2: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); createTableMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return createTableMessageText;
  }

  async importDataToExpenseTypesAsync(): Promise<string> {
    var records = 'INSERT INTO ExpenseTypes (areaOfPayment, itemOrService) VALUES (\'Vegetables\', \'Garland\'), (\'Vegetables\', \'Big Onions\'), (\'Vegetables\', \'Small Onions\'), (\'Vegetables\', \'Carrot\'), (\'Vegetables\', \'Garlic\'), (\'Vegetables\', \'Ginger\'), (\'Vegetables\', \'Lady\'\'s Finger\'), (\'Vegetables\', \'Sau-sau\'), (\'Vegetables\', \'Karanai\'), (\'Vegetables\', \'Ridge Guard\'), (\'Vegetables\', \'Snake Guard\'), (\'Vegetables\', \'Bitter Guard\'), (\'Vegetables\', \'Potato\'), (\'Vegetables\', \'Sweet Potato\'), (\'Vegetables\', \'Tomato\'), (\'Vegetables\', \'Brinjal\'), (\'Vegetables\', \'Beans\'), (\'Vegetables\', \'Radish\'), (\'Vegetables\', \'Beetroot\'), (\'Vegetables\', \'Avarai\'), (\'Vegetables\', \'Curry Leaves\'), (\'Vegetables\', \'Chilly\'), (\'Vegetables\', \'Coconuts\'), (\'Vegetables\', \'Banana-flower\'), (\'Vegetables\', \'Banana-stem\'), (\'Vegetables\', \'Maize\'), (\'Vegetables\', \'Pudina\'), (\'Vegetables\', \'Keerai\'), (\'Vegetables\', \'Moringa\'), (\'Vegetables\', \'Carry Bag\'), ' +
    '(\'Non-vegetables\', \'Chicken\'), (\'Non-vegetables\', \'Mutton\'), (\'Non-vegetables\', \'Fish\'), (\'Non-vegetables\', \'Eggs\'), '+
    '(\'Groceries\', \'Rice\'), (\'Groceries\', \'Groundnuts\'), (\'Groceries\', \'Fenugreek\'), (\'Groceries\', \'Mustard\'), (\'Groceries\', \'Asafoetida\'), (\'Groceries\', \'Ariel\'), (\'Groceries\', \'Comfort\'), (\'Groceries\', \'Dettol\'), (\'Groceries\', \'Detergent\'), (\'Groceries\', \'Cinthol\'), (\'Groceries\', \'Jaggery\'), (\'Groceries\', \'Toothbrush\'), (\'Groceries\', \'GnutOil\'), (\'Groceries\', \'Maida\'), (\'Groceries\', \'Rawa\'), (\'Groceries\', \'Sugar\'), (\'Groceries\', \'Phenyl\'), (\'Groceries\', \'VimGel\'), (\'Groceries\', \'ExoBar\'), (\'Groceries\', \'CrystalSalt\'), (\'Groceries\', \'Salt\'), (\'Groceries\', \'SesameOil\'), (\'Groceries\', \'SesameSeeds\'), (\'Groceries\', \'Atta\'), (\'Groceries\', \'KitchenUtensils\'), (\'Groceries\', \'DrawingTools\'), (\'Groceries\', \'Ragi Flour\'), (\'Groceries\', \'Kadalai Flour\'), (\'Groceries\', \'Pottu Kadalai\'), ' +
    '(\'Fruits\', \'Banana\'), (\'Fruits\', \'Kamala Orange\'), (\'Fruits\', \'Orange\'), (\'Fruits\', \'Green Grapes\'), (\'Fruits\', \'Black Grapes\'), (\'Fruits\', \'Pomogrenate\'), (\'Fruits\', \'Apple\'), (\'Fruits\', \'Red Plums\'), (\'Fruits\', \'Mango\'), (\'Fruits\', \'Sapota\'), (\'Fruits\', \'Guava\'), ' +
    '(\'Food\', \'Milk\'), (\'Food\', \'Zomato\'), (\'Food\', \'Groceries\'), (\'Food\', \'Fruits\'), (\'Food\', \'Bakeries\'), (\'Food\', \'Biscuits\'), (\'Food\', \'Hotel\'), ' +
    '(\'Shelter\', \'House rent\'), (\'Shelter\', \'Water bill\'), (\'Shelter\', \'Electricity bill\'), ' +
    '(\'Clothing\', \'Man\'), (\'Clothing\', \'Woman\'), ' +
    '(\'Travel\', \'Car water wash\'), (\'Travel\', \'Car diesel\'), (\'Travel\', \'Hotels\'), (\'Travel\', \'Ksrtc\'), (\'Travel\', \'Irctc\'), (\'Travel\', \'Ola Cab\'), (\'Travel\', \'Ola Auto\'), (\'Travel\', \'Daily shuttle\'), (\'Travel\', \'Toll\'), (\'Travel\', \'Parking\'), ' +
    '(\'Entertainment\', \'Cable\'), (\'Entertainment\', \'Internet\'), (\'Entertainment\', \'Movies\'), (\'Entertainment\', \'MobileTopup\'), ' +
    '(\'Medical\', \'Cmc\'), (\'Medical\', \'Sanitary\'), (\'Medical\', \'Consulting\'), ' +
    '(\'Personal\', \'Giving\'), (\'Personal\', \'Debt\'), ' +
    '(\'ExclusiveBuy\', \'Books\'), (\'ExclusiveBuy\', \'Ear Rings\'), ' +
    '(\'Grooming\', \'Haircut\')';

    var importDataMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      await db.executeSql(records, [])
        .then(createTableResponse => {
          console.log('Imported the data successfully! ' + JSON.stringify(createTableResponse));
          importDataMessageText = 'Imported the data successfully! ' + JSON.stringify(createTableResponse);
        }).catch(e => { console.log('SvcException 2: ' + JSON.stringify(e)); importDataMessageText = 'SvcException 2: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); importDataMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return importDataMessageText;
  }

  async getAllExpenseTypesFromDbAsync(): Promise<ExpenseTypeModel[]> {
    var messageText: string = '';
    var expenseTypeModels: ExpenseTypeModel[] = [];

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let selectStmt = 'SELECT * FROM ExpenseTypes ORDER BY areaOfPayment ASC';

      await db.executeSql(selectStmt, [])
        .then(selectStmtResponse => {
          for (var idx = 0; idx < selectStmtResponse.rows.length; idx += 1) {
            var currentRow = selectStmtResponse.rows.item(idx);
            
            expenseTypeModels.push({
              id: currentRow.id,
              areaOfPayment: currentRow.areaOfPayment,
              itemOrService: currentRow.itemOrService
            });
          }
        }).catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); messageText = JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 2: ' + e); messageText = e; });

    return expenseTypeModels;
  }

  async createTableExpenseAtDbAsync(): Promise<string> {
    var createTableMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      var createTableSqlText = 'CREATE TABLE IF NOT EXISTS Expense(id INTEGER PRIMARY KEY AUTOINCREMENT, areaOfPayment TEXT, modeOfPayment TEXT, itemOrService TEXT, howMuchMoney INTEGER, currencyType TEXT, transactionDatetime TEXT, transactionNotes TEXT)';
      //createTableSqlText = 'ALTER TABLE Expense DROP COLUMN IsPrivate;';
      //createTableSqlText = 'ALTER TABLE Expense ADD COLUMN labels TEXT DEFAULT \'\'';
      await db.executeSql(createTableSqlText, [])
        .then(createTableResponse => {
          console.log('Table, "Expense" created successfully!');
        }).catch(e => { console.log('SvcException 2: ' + JSON.stringify(e)); createTableMessageText = 'SvcException 2: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); createTableMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return createTableMessageText;
  }

  async getAllExpensesFromDbAsync(filterCondition: string): Promise<ExpenseModel[]> {
    var messageText: string = '';
    var expenseModels: ExpenseModel[] = [];

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let selectStmt = 'SELECT * FROM Expense ' + filterCondition + ' ORDER BY DATE(transactionDatetime) ASC';

      await db.executeSql(selectStmt, [])
        .then(selectStmtResponse => {
          this.messageService.add('Expense length | ' + selectStmtResponse.rows.length);
          for (var idx = 0; idx < selectStmtResponse.rows.length; idx += 1) {
            var currentRow = selectStmtResponse.rows.item(idx);
            expenseModels.push({
              id: currentRow.id,
              labels: currentRow.labels,
              transactionMonth: this.datepipe.transform(new Date(currentRow.transactionDatetime), 'MMM'),
              areaOfPayment: currentRow.areaOfPayment,
              itemOrService: currentRow.itemOrService,
              modeOfPayment: currentRow.modeOfPayment,
              howMuchMoney: currentRow.howMuchMoney,
              currencyType: currentRow.currencyType,
              transactionDatetime: currentRow.transactionDatetime,
              transactionNotes: currentRow.transactionNotes
            });
          }
        }).catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); messageText = JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 2: ' + e); messageText = e; });

    return expenseModels;
  }

  async getUniqueTransactionMonthsFromDbAsync(): Promise<string[]> {
    var messageText: string = '';
    let distinctDates: string[] = [];
    let monthList = [{idx: '01', text: 'Jan'}, {idx: '02', text: 'Feb'}, {idx: '03', text: 'Mar'}, {idx: '04', text: 'Apr'},
    {idx: '05', text: 'May'}, {idx: '06', text: 'Jun'}, {idx: '07', text: 'Jul'}, {idx: '08', text: 'Aug'},
    {idx: '09', text: 'Sep'}, {idx: '10', text: 'Oct'}, {idx: '11', text: 'Nov'}, {idx: '12', text: 'Dec'}];

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let distinctDatesStmt = 'SELECT DISTINCT strftime(\'%m\', transactionDatetime) as transactionMonth, strftime(\'%Y\', transactionDatetime) as transactionYear FROM Expense';
      await db.executeSql(distinctDatesStmt, [])
      .then(queryResponse => {
        for (var idx = 0; idx < queryResponse.rows.length; idx += 1) {
          var currentRow = queryResponse.rows.item(idx);
          var _monthText_ = monthList.find(r => r.idx === currentRow.transactionMonth).text + '-' + currentRow.transactionYear;
          distinctDates.push(_monthText_);
        }
      });
    }).catch(e => { console.log('SvcException 2: ' + e); messageText = e; });
    return distinctDates;
  }

  async getDataForPieChartForAMonthFromDbAsync(monthLabel: string): Promise<any[]> {
    var messageText: string = '';
    var freePieChartData: any[] = [];
    let monthList = [{idx: '01', text: 'Jan'}, {idx: '02', text: 'Feb'}, {idx: '03', text: 'Mar'}, {idx: '04', text: 'Apr'},
    {idx: '05', text: 'May'}, {idx: '06', text: 'Jun'}, {idx: '07', text: 'Jul'}, {idx: '08', text: 'Aug'},
    {idx: '09', text: 'Sep'}, {idx: '10', text: 'Oct'}, {idx: '11', text: 'Nov'}, {idx: '12', text: 'Dec'}];

    var _monthLabel_ =  monthLabel.split('-');
    var _monthNumber_ = monthList.find(r => r.text === _monthLabel_[0]).idx;
    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let totalSumOfMoneyStmt = 'SELECT SUM(howMuchMoney) as totalSumOfMoney FROM Expense ' +
      'WHERE strftime(\'%m\', transactionDatetime) = \'' + _monthNumber_ + '\' AND ' +
      'strftime(\'%Y\', transactionDatetime) = \'' + _monthLabel_[1] + '\'';
      let totalSumOfMoney:number = 1;
      await db.executeSql(totalSumOfMoneyStmt, [])
      .then(queryResponse => {
        totalSumOfMoney = queryResponse.rows.item(0).totalSumOfMoney;
      });

      let selectStmt = 'SELECT areaOfPayment, SUM(howMuchMoney)/' + totalSumOfMoney.toFixed(2) + ' as sumOfMoney FROM Expense ' +
      'WHERE strftime(\'%m\', transactionDatetime) = \'' + _monthNumber_ + '\' AND ' +
      'strftime(\'%Y\', transactionDatetime) = \'' + _monthLabel_[1] + '\' ' +
      'GROUP BY areaOfPayment';
      await db.executeSql(selectStmt, [])
        .then(selectStmtResponse => {
          for (var idx = 0; idx < selectStmtResponse.rows.length; idx += 1) {
            var currentRow = selectStmtResponse.rows.item(idx);
            freePieChartData.push({
              transactionDate: currentRow.transactionDate,
              areaOfPayment: currentRow.areaOfPayment,
              sumOfMoney: currentRow.sumOfMoney
            });
          }
        }).catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); messageText = JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 2: ' + e); messageText = e; });
    return freePieChartData;
  }

  async createTableFrequentExpenseTransactionsAtDbAsync(): Promise<string> {
    var createTableMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      await db.executeSql('CREATE TABLE IF NOT EXISTS FrequentExpenseTransactions (id INTEGER PRIMARY KEY AUTOINCREMENT, areaOfPayment TEXT, modeOfPayment TEXT, itemOrService TEXT, howMuchMoney INTEGER, currencyType TEXT)', [])
        .then(createTableResponse => {
          console.log('Table, "FrequentExpenseTransactions" created successfully!');
        }).catch(e => { console.log('SvcException 2: ' + JSON.stringify(e)); createTableMessageText = 'SvcException 2: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); createTableMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return createTableMessageText;
  }

  async getFreqTop5ExpensesFromDbAsync(): Promise<ExpenseModel[]> {
    var messageText: string = '';
    var expenseModels: ExpenseModel[] = [];

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let insertStmt = 'INSERT INTO FrequentExpenseTransactions (areaOfPayment, modeOfPayment, itemOrService, howMuchMoney, currencyType) ' +
        'SELECT areaOfPayment, modeOfPayment, itemOrService, howMuchMoney, currencyType FROM (SELECT (areaOfPayment+\'|\'+modeOfPayment+\'|\'+itemOrService+\'|\'+howMuchMoney+\'|\'+currencyType) AS expenseType, ' +
        'areaOfPayment, modeOfPayment, itemOrService, howMuchMoney, currencyType, COUNT(*) AS frequency FROM Expense ' +
        'GROUP BY (areaOfPayment+\'|\'+modeOfPayment+\'|\'+itemOrService+\'|\'+howMuchMoney+\'|\'+currencyType), areaOfPayment, modeOfPayment, itemOrService, howMuchMoney, currencyType ' +
        'HAVING COUNT(*) > 1) subQuery ' +
        'WHERE expenseType NOT IN (SELECT areaOfPayment+\'|\'+modeOfPayment+\'|\'+itemOrService+\'|\'+howMuchMoney+\'|\'+currencyType as expenseType FROM FrequentExpenseTransactions) ' +
        '';

      await db.executeSql(insertStmt, [])
        .then(async (insertStmtResponse) => {
          console.log(insertStmtResponse);

          let selectStmt = 'SELECT * FROM FrequentExpenseTransactions';

          await db.executeSql(selectStmt, [])
            .then(selectStmtResponse => {
              for (var idx = 0; idx < selectStmtResponse.rows.length; idx += 1) {
                var currentRow = selectStmtResponse.rows.item(idx);
                expenseModels.push({
                  id: currentRow.id,
                  labels: currentRow.labels,
                  areaOfPayment: currentRow.areaOfPayment,
                  itemOrService: currentRow.itemOrService,
                  modeOfPayment: currentRow.modeOfPayment,
                  howMuchMoney: currentRow.howMuchMoney,
                  currencyType: currentRow.currencyType,
                  transactionDatetime: '',
                  transactionNotes: ''
                });
              }
            }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); messageText = JSON.stringify(e); });
        }).catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); messageText = JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 2: ' + e); messageText = e; });

    return expenseModels;
  }

  async getExpenseByFrequentExpenseTransactionIdFromDbAsync(frequentExpenseTransactionId: number): Promise<ExpenseModel> {
    var messageText: string = '';
    var expenseModel: ExpenseModel;

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let selectStmt = 'SELECT * FROM FrequentExpenseTransactions WHERE id = ' + frequentExpenseTransactionId;

      await db.executeSql(selectStmt, [])
        .then(selectStmtResponse => {
          var currentRow = selectStmtResponse.rows.item(0);
          expenseModel = {
            id: currentRow.id,
            labels: currentRow.labels,
            areaOfPayment: currentRow.areaOfPayment,
            itemOrService: currentRow.itemOrService,
            modeOfPayment: currentRow.modeOfPayment,
            howMuchMoney: currentRow.howMuchMoney,
            currencyType: currentRow.currencyType,
            transactionDatetime: '',
            transactionNotes: ''
          };
        }).catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); messageText = JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 2: ' + e); messageText = e; });

    return expenseModel;
  }

  async getExpenseByIdFromDbAsync(expenseModelId: number): Promise<ExpenseModel> {
    var messageText: string = '';
    var expenseModel: ExpenseModel;

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let selectStmt = 'SELECT * FROM Expense WHERE id = ' + expenseModelId;

      await db.executeSql(selectStmt, [])
        .then(selectStmtResponse => {
          var currentRow = selectStmtResponse.rows.item(0);
          expenseModel = {
            id: currentRow.id,
            labels: currentRow.labels,
            areaOfPayment: currentRow.areaOfPayment,
            itemOrService: currentRow.itemOrService,
            modeOfPayment: currentRow.modeOfPayment,
            howMuchMoney: currentRow.howMuchMoney,
            currencyType: currentRow.currencyType,
            transactionDatetime: currentRow.transactionDatetime,
            transactionNotes: currentRow.transactionNotes
          };
        }).catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); messageText = JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 2: ' + e); messageText = e; });

    return expenseModel;
  }

  async addExpenseToDbAsync(expenseModel: ExpenseModel): Promise<string> {
    var insertMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let insertStmt = 'INSERT INTO Expense (labels, areaOfPayment, modeOfPayment, itemOrService, howMuchMoney, currencyType, transactionDatetime, transactionNotes) VALUES (\'' 
        + expenseModel.labels + '\', \''
        + expenseModel.areaOfPayment + '\', \''
        + expenseModel.modeOfPayment + '\', \''
        + expenseModel.itemOrService + '\', \''
        + expenseModel.howMuchMoney + '\', \''
        + expenseModel.currencyType + '\', \''
        + expenseModel.transactionDatetime + '\', \''
        + expenseModel.transactionNotes + '\')';

      console.log(insertStmt);

      await db.executeSql(insertStmt, [])
        .then(insertStmtResponse => { console.log('Inserted successfully'); insertMessageText = 'Inserted successfully'; })
        .catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); insertMessageText = 'SvcException 1: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); insertMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return insertMessageText;
  }

  async updateExpenseAtDbAsync(expenseModel: ExpenseModel): Promise<string> {
    var updateMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let updateStmt = 'UPDATE Expense SET labels = \''+ expenseModel.labels + '\','
        + 'areaOfPayment = \'' + expenseModel.areaOfPayment + '\','
        + 'modeOfPayment = \'' + expenseModel.modeOfPayment + '\','
        + 'itemOrService = \'' + expenseModel.itemOrService + '\','
        + 'howMuchMoney = \'' + expenseModel.howMuchMoney + '\','
        + 'currencyType = \'' + expenseModel.currencyType + '\','
        + 'transactionDatetime = \'' + expenseModel.transactionDatetime + '\','
        + 'transactionNotes = \'' + expenseModel.transactionNotes + '\' '
        + 'WHERE id = \'' + expenseModel.id + '\'';

      console.log(updateStmt);

      await db.executeSql(updateStmt, [])
        .then(insertStmtResponse => { console.log('Updated successfully'); updateMessageText = 'Updated successfully'; })
        .catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); updateMessageText = 'SvcException 1: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); updateMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return updateMessageText;
  }

  async deleteExpenseFromDbAsync(expenseModelId: number): Promise<string> {
    var deleteMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let deleteStmt = 'DELETE FROM Expense WHERE id = ' + expenseModelId;

      await db.executeSql(deleteStmt, [])
        .then(insertStmtResponse => { console.log('Deleted successfully'); deleteMessageText = 'Deleted successfully'; })
        .catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); deleteMessageText = 'SvcException 1: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); deleteMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return deleteMessageText;
  }

  async createTableIncomeAtDbAsync(): Promise<string> {
    var createTableMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      await db.executeSql('CREATE TABLE IF NOT EXISTS Income(id INTEGER PRIMARY KEY AUTOINCREMENT, incomeSource TEXT, howMuchMoney INTEGER, currencyType TEXT, transactionDatetime TEXT, transactionNotes TEXT)', [])
        .then(async (createTableResponse) => {
          console.log('Table, "Income" created successfully!');
        }).catch(e => { console.log('SvcException 2: ' + JSON.stringify(e)); createTableMessageText = 'SvcException 2: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); createTableMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return createTableMessageText;
  }

  async getAllIncomesFromDbAsync(): Promise<IncomeModel[]> {
    var messageText: string = '';
    var incomeModels: IncomeModel[] = [];

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let selectStmt = 'SELECT * FROM Income';

      await db.executeSql(selectStmt, [])
        .then(selectStmtResponse => {
          for (var idx = 0; idx < selectStmtResponse.rows.length; idx += 1) {
            var currentRow = selectStmtResponse.rows.item(idx);
            incomeModels.push({
              id: currentRow.id,
              transactionMonth: this.datepipe.transform(new Date(currentRow.transactionDatetime), 'MMM'),
              incomeSource: currentRow.incomeSource,
              howMuchMoney: currentRow.howMuchMoney,
              currencyType: currentRow.currencyType,
              transactionDatetime: currentRow.transactionDatetime,
              transactionNotes: currentRow.transactionNotes
            });
          }
        }).catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); messageText = JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 2: ' + e); messageText = e; });

    return incomeModels;
  }

  async getIncomeByIdFromDbAsync(incomeModelId: number): Promise<IncomeModel> {
    var messageText: string = '';
    var incomeModel: IncomeModel;

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let selectStmt = 'SELECT * FROM Income WHERE id = ' + incomeModelId;

      await db.executeSql(selectStmt, [])
        .then(selectStmtResponse => {
          var currentRow = selectStmtResponse.rows.item(0);
          incomeModel = {
            id: currentRow.id,
            transactionMonth: this.datepipe.transform(new Date(currentRow.transactionDatetime), 'MMM'),
            incomeSource: currentRow.incomeSource,
            howMuchMoney: currentRow.howMuchMoney,
            currencyType: currentRow.currencyType,
            transactionDatetime: currentRow.transactionDatetime,
            transactionNotes: currentRow.transactionNotes
          };
        }).catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); messageText = JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 2: ' + e); messageText = e; });

    return incomeModel;
  }

  async addIncomeToDbAsync(incomeModel: IncomeModel): Promise<string> {
    var insertMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let insertStmt = 'INSERT INTO Income (incomeSource, howMuchMoney, currencyType, transactionDatetime, transactionNotes) VALUES (\'' + incomeModel.incomeSource + '\', \''
        + incomeModel.howMuchMoney + '\', \''
        + incomeModel.currencyType + '\', \''
        + incomeModel.transactionDatetime + '\', \''
        + incomeModel.transactionNotes + '\')';

      await db.executeSql(insertStmt, [])
        .then(insertStmtResponse => { console.log('Inserted successfully'); insertMessageText = 'Inserted successfully'; })
        .catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); insertMessageText = 'SvcException 1: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); insertMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return insertMessageText;
  }

  async updateIncomeAtDbAsync(incomeModel: IncomeModel): Promise<string> {
    var updateMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let updateStmt = 'UPDATE Income SET incomeSource = \'' + incomeModel.incomeSource + '\','
        + 'howMuchMoney = \'' + incomeModel.howMuchMoney + '\','
        + 'currencyType = \'' + incomeModel.currencyType + '\','
        + 'transactionDatetime = \'' + incomeModel.transactionDatetime + '\','
        + 'transactionNotes = \'' + incomeModel.transactionNotes + '\''
        + 'WHERE id = \'' + incomeModel.id + '\'';

      await db.executeSql(updateStmt, [])
        .then(insertStmtResponse => { console.log('Updated successfully'); updateMessageText = 'Updated successfully'; })
        .catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); updateMessageText = 'SvcException 1: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); updateMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return updateMessageText;
  }

  async deleteIncomeFromDbAsync(incomeModelId: number): Promise<string> {
    var deleteMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let deleteStmt = 'DELETE FROM Income WHERE id = ' + incomeModelId;

      await db.executeSql(deleteStmt, [])
        .then(insertStmtResponse => { console.log('Deleted successfully'); deleteMessageText = 'Deleted successfully'; })
        .catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); deleteMessageText = 'SvcException 1: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); deleteMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return deleteMessageText;
  }
}
