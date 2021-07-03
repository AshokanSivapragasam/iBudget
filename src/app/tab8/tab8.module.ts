import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { SdCardFileService } from '../services/sd-card-file/sd-card-file.service';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { Tab8Page } from './tab8.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab8Page }])
  ],
  declarations: [Tab8Page],
  providers: [File, SdCardFileService, FileChooser]
})
export class Tab8PageModule {
  
}
