import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ExpenseModel } from 'src/app/models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class SqliteStorageService {

  constructor(private sqlite: SQLite) {

  }

  async getAllExpensesFromDbAsync(): Promise<ExpenseModel[]> {
    var insertMessageText: string = '';
    var expenseModels: ExpenseModel[] = [];

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      let selectStmt = 'SELECT * FROM Expense';
      
      await db.executeSql(selectStmt, [])
      .then(selectStmtResponse => {
        for(var idx = 0; idx < selectStmtResponse.rows.length; idx += 1) {
          var currentRow = selectStmtResponse.rows.item(idx);
          expenseModels.push({
            id: currentRow.id,
            areaOfPayment: currentRow.areaOfPayment,
            itemOrService: currentRow.itemOrService,
            modeOfPayment: currentRow.modeOfPayment,
            howMuchMoney: currentRow.howMuchMoney,
            currencyType: currentRow.currencyType,
            transactionDatetime: currentRow.transactionDatetime,
            transactionNotes: currentRow.transactionNotes
          });
        }
      }).catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); insertMessageText = JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 2: ' + e); insertMessageText = e; });

    return expenseModels;
  }

  async addExpenseToDbAsync(expenseModel: ExpenseModel): Promise<string> {
    var insertMessageText: string = '';

    await this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let insertStmt = 'INSERT INTO Expense VALUES (\'' + expenseModel.id + '\', \'' 
        + expenseModel.areaOfPayment + '\', \'' 
        + expenseModel.modeOfPayment + '\', \'' 
        + expenseModel.itemOrService + '\', \'' 
        + expenseModel.howMuchMoney + '\', \'' 
        + expenseModel.currencyType + '\', \'' 
        + expenseModel.transactionDatetime + '\', \'' 
        + expenseModel.transactionNotes + '\')';

        db.executeSql(insertStmt)
        .then(insertStmtResponse => { console.log('Inserted successfully'); insertMessageText = 'Inserted successfully'; })
        .catch(e => { console.log('SvcException 1: ' + JSON.stringify(e)); insertMessageText = 'SvcException 1: ' + JSON.stringify(e); });

      db.executeSql('CREATE TABLE Expense(id INTEGER PRIMARY KEY, areaOfPayment TEXT, modeOfPayment TEXT, itemOrService TEXT, howMuchMoney INTEGER, currencyType TEXT, transactionDatetime TEXT, transactionNotes TEXT)')
      .then(createTableResponse => {
        console.log('Table, "Expense" created successfully!');
      }).catch(e => { console.log('SvcException 2: ' + JSON.stringify(e)); insertMessageText = 'SvcException 2: ' + JSON.stringify(e); });
    }).catch(e => { console.log('SvcException 3: ' + JSON.stringify(e)); insertMessageText = 'SvcException 3: ' + JSON.stringify(e); });

    return insertMessageText;
  }
}
