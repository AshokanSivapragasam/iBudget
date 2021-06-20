import { Component } from '@angular/core';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss']
})
export class Tab7Page {
  constructor(private messageService: MessageService) {
  }
}
