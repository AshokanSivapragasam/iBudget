import { Component, OnInit, Input } from '@angular/core';
import { NodeModel } from 'src/app/models/node.model';
import { Router } from '@angular/router';
import { SqliteStorageService } from 'src/app/services/sqlite-storage/sqlite-storage.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  @Input() nodes: NodeModel[];
  constructor(private router: Router,
              private sqliteStorageService: SqliteStorageService) { }

  ngOnInit() {
  }

  toggleCollapse(node: NodeModel) {
    node.collapse = !node.collapse;
  }

  updateExpenseAtDb(expenseModelId: number) {
    console.log('updateExpenseAtDb ' + expenseModelId);
    this.router.navigate(['/tabs/tab2', expenseModelId]);
  }

  consoleLog() {
    console.log('consoleLog');
  }
  
  deleteExpenseTransaction(index: number) {
    this.sqliteStorageService.deleteExpenseFromDbAsync(index)
    .then(_deleteMessageText_ => {
      console.log(_deleteMessageText_);
      location.reload();
    });
  }
}
