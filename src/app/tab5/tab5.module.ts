import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule} from 'angular-google-charts';

import { Tab5Page } from './tab5.page';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    RouterModule.forChild([{ path: '', component: Tab5Page }])
  ],
  declarations: [Tab5Page],
  providers: [DatePicker, DatePipe]
})
export class Tab5PageModule {
  
}
