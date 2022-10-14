import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CurrencydataService } from "@app/services";
import { CurrencyResponceModel, CurrencyCodes } from './shared/models';

type CurrencyOrder =  1 | 2;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'currecy-calculator';
  currencyForm: FormGroup = this.formBuilder.group({
    firstInput: [ 0 ],
    secondInput: [ 0 ],
    firstSelect: [CurrencyCodes.EUR],
    secondSelect: [CurrencyCodes.EUR],

  });

  firstCurrJson!: CurrencyResponceModel;
  secondCurrJson!: CurrencyResponceModel ;

  firstCurrency = CurrencyCodes.EUR;
  secondCurrency = CurrencyCodes.EUR;

  CURRENCY_CODES = CurrencyCodes;

  get firstInput(): AbstractControl {
    return this.currencyForm.controls["firstInput"];
  } 

  get secondInput(): AbstractControl {
    return this.currencyForm.controls["secondInput"];
  }

  constructor ( private currencyService: CurrencydataService, private formBuilder: FormBuilder ) { }
  
  ngOnInit() {
    this.setCurrencyValue(CurrencyCodes.EUR, 1);
    this.setCurrencyValue(CurrencyCodes.EUR, 2);
  }

  setCurrencyValue(currencyCode: CurrencyCodes | string , order: CurrencyOrder): void {
    order === 1 ? this.firstCurrency = currencyCode as CurrencyCodes : this.secondCurrency = currencyCode as CurrencyCodes;
    order === 1 ? this.getCurrencyData(this.firstCurrency, 1) : this.getCurrencyData(this.secondCurrency, 2);
  }

  onInput( formInputKey: string ) {
    this.calcCurrency(formInputKey);
  } 

  private getCurrencyData (currencyCode: CurrencyCodes, order: CurrencyOrder): void {
    this.currencyService.getCurrencyData(currencyCode).subscribe( (data :CurrencyResponceModel) => {
      this.setCurrencyData(data, order);
    })
  }

  private setCurrencyData (currencyData: CurrencyResponceModel, order: CurrencyOrder): void {
    order === 1 ? this.firstCurrJson = currencyData : this.secondCurrJson = currencyData;
  }

  private calcCurrency(formInputKey: string): void {

    let mainField!: AbstractControl;
    let supportingField!: AbstractControl;
    let currency!: string;

    if ( formInputKey === "firstInput" ) {
      mainField = this.firstInput; 
      supportingField = this.secondInput;
      currency = this.secondCurrency

      supportingField.setValue(mainField.value * this.firstCurrJson.rates[currency])
    } else if (formInputKey === "secondInput")  {
      mainField = this.firstInput; 
      supportingField = this.secondInput;
      currency = this.firstCurrency

      mainField.setValue(supportingField.value * this.secondCurrJson.rates[currency])
    }
  }

}

