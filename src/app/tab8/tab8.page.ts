import { Component } from '@angular/core';
import { MessageService } from '../services/message/message.service';
import { File } from '@ionic-native/file/ngx';
import { SdCardFileService } from '../services/sd-card-file/sd-card-file.service';
import { SqliteStorageService } from '../services/sqlite-storage/sqlite-storage.service';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-tab8',
  templateUrl: 'tab8.page.html',
  styleUrls: ['tab8.page.scss']
})
export class Tab8Page {
  suggestedFilename: string = '';
  queryText: string = '';
  queryResponseJson: string = '';
  faqs: any[] = [];
  pathDirChosen: string = '';
  fileDirChosen: string = '';
  constructor(private messageService: MessageService,
        private file: File,
        private sdCardFileService: SdCardFileService,
        private sqliteStorageService: SqliteStorageService,
        private fileChooser: FileChooser) {
          this.faqs = [{ name: "all_tables", queryText: "SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%'" },
          { name: "expenses", queryText: "SELECT * FROM Expense" },
          { name: "incomes", queryText: "SELECT * FROM Income" },
          { name: "fets", queryText: "SELECT * FROM FrequentExpenseTransactions" },
          { name: "et", queryText: "SELECT * FROM ExpenseTypes" }];
  }

  executeSqlStmt(queryText: string) {
    this.sqliteStorageService.executeSqlStmt(queryText)
    .then(_queryResponse_ =>
    {
      this.queryResponseJson = JSON.stringify(_queryResponse_, null, 2);
      console.log(this.queryResponseJson);
    });
  }

  replaceQueryText(faQueryText: string, tableName: string) {
    this.queryText = faQueryText;
    this.suggestedFilename = tableName + '.json';
  }

  chooseFilePath() {
    this.fileChooser.open()
    .then(uri => {
      this.messageService.add(uri);
      this.pathDirChosen = uri.substring(0, uri.lastIndexOf('/'));
      this.fileDirChosen = uri.substring(uri.lastIndexOf('/'));
      this.messageService.add(uri + " | " + this.pathDirChosen + " | " + this.fileDirChosen);
      this.file.readAsText(this.pathDirChosen, this.fileDirChosen).then(fileData => {
        console.log(fileData);
        this.messageService.add(fileData);
      });
    })
    .catch(e => { this.messageService.add(JSON.stringify(e)); console.log(e); });
  }

  writeToFile(queryResponseJson: string) {
    let _filePath_ = this.file.externalDataDirectory + this.suggestedFilename;
    this.sdCardFileService.writeFile(this.file.externalDataDirectory, this.suggestedFilename, queryResponseJson).then(_ => {
      console.log('File write success! ' + _filePath_);
      this.messageService.add('File write success!');
    }).catch((reason) => {
      console.log('File write failed! ' + _filePath_ + " | " + JSON.stringify(reason));
      this.messageService.add('File write failed!');
    });
  } 
}
