import { Component } from '@angular/core';
import { IncomeModel } from '../models/income.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  incomeSourceOptions: string[] = ['Salary'];
  currencyTypeOptions: string[] = ['INR', 'USD'];
  
  incomeModel: IncomeModel;
  incomeModels: IncomeModel[];
  incomeFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private commonService: CommonService,
              private file: File) {
    this.incomeFormGroup = formBuilder.group({
      incomeSource: ['', Validators.required],
      howMuchMoney: [1, Validators.required],
      currencyType: ['', Validators.required]
    });
    
    this.file.writeFile('.', '_file_.json', '{"a": "b"}');
  }

  addIncome() {
    this.incomeModel = {
      incomeSource: this.incomeFormGroup.value.incomeSource,
      howMuchMoney: this.incomeFormGroup.value.howMuchMoney,
      currencyType: this.incomeFormGroup.value.currencyType
    }
    this.commonService.incomeModels.push(this.incomeModel);
    console.log(this.commonService.incomeModels.length);
    console.log(JSON.stringify(this.incomeModel));
  }
}
