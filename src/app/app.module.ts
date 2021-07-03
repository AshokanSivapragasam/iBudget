import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import { GoogleChartsModule } from 'angular-google-charts';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SqliteStorageService } from 'src/app/services/sqlite-storage/sqlite-storage.service';
import { SdCardFileService } from './services/sd-card-file/sd-card-file.service';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './services/common/common.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    GoogleChartsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    SQLitePorter,
    SqliteDbCopy,
    DatePipe,
    SqliteStorageService,
    SdCardFileService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry
    .addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'))
    .addSvgIcon("iBudget001", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget001.svg'))
    .addSvgIcon("iBudget002", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget002.svg'))
    .addSvgIcon("iBudget003", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget003.svg'))
    .addSvgIcon("iBudget004", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget004.svg'))
    .addSvgIcon("iBudget005", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget005.svg'))
    .addSvgIcon("iBudget006", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget006.svg'))
    .addSvgIcon("iBudget007", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget007.svg'))
    .addSvgIcon("iBudget008", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget008.svg'))
    .addSvgIcon("iBudget009", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget009.svg'))
    .addSvgIcon("iBudget010", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget010.svg'))
    .addSvgIcon("iBudget011", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget011.svg'))
    .addSvgIcon("iBudget012", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget012.svg'))
    .addSvgIcon("iBudget013", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget013.svg'))
    .addSvgIcon("iBudget014", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget014.svg'))
    .addSvgIcon("iBudget015", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget015.svg'))
    .addSvgIcon("iBudget016", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget016.svg'))
    .addSvgIcon("iBudget017", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget017.svg'))
    .addSvgIcon("iBudget018", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget018.svg'))
    .addSvgIcon("iBudget019", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget019.svg'))
    .addSvgIcon("iBudget020", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget020.svg'))
    .addSvgIcon("iBudget021", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget021.svg'))
    .addSvgIcon("iBudget022", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget022.svg'))
    .addSvgIcon("iBudget023", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget023.svg'))
    .addSvgIcon("iBudget024", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget024.svg'))
    .addSvgIcon("iBudget025", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget025.svg'))
    .addSvgIcon("iBudget026", domSanitizer.bypassSecurityTrustResourceUrl('./assets/001/iBudget026.svg'));
  }
}
