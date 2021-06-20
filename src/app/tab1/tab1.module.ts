import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { TreeViewModule } from 'ionic-tree-view';
import { NodeComponent } from '../components/node/node.component';

import { CalendarModule } from 'ion2-calendar';
import { File } from '@ionic-native/file/ngx';
import { SdCardFileService } from '../services/sd-card-file/sd-card-file.service';
import { MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    TreeViewModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: Tab1Page }
    ]),
    MatIconModule,
    HttpClientModule
  ],
  declarations: [Tab1Page, NodeComponent],
  providers: [File, SdCardFileService, DatePipe]
})
export class Tab1PageModule {}
