import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tab7Page } from './tab7.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: Tab7Page }])
  ],
  declarations: [Tab7Page]
})
export class Tab7PageModule {
  
}
