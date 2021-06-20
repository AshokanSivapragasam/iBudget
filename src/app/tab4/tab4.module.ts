import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule} from 'angular-google-charts';

import { Tab4Page } from './tab4.page';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { CommonService } from '../services/common/common.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }])
  ],
  declarations: [Tab4Page],
  providers: [DatePicker, DatePipe, CommonService]
})
export class Tab4PageModule {}
