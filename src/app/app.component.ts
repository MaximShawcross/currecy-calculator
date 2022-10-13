import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencydataService } from './currencydata.service';
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'currecy-calculator';

  input = new FormControl(0);
  input2 = new FormControl(0);

  firstCurrJson: any;
  secondCurrJson: any;

  firstCurrency = "EUR";
  secondCurrency = "EUR";
  result: string = "1";
  

  ngOnInit() {
    this.changeFirst("EUR");
    this.changeSecond("EUR");
  }

  changeFirst(first: string) {
    this.firstCurrency = first;
    this.convert(this.firstCurrency, 1);
  }

  changeSecond(second: string) {
    this.secondCurrency = second;
    this.convert(this.secondCurrency, 2);
  }

  constructor ( private currency: CurrencydataService ) { }

  convert(str: string, curNum: 1 | 2) {

    this.currency.getCurrencyData(str).subscribe( data => {
      curNum === 1 ? this.firstCurrJson = JSON.stringify(data) : this.secondCurrJson = JSON.stringify(data);
      curNum === 1 ? this.firstCurrJson = JSON.parse(this.firstCurrJson) : this.secondCurrJson = JSON.parse(this.secondCurrJson); 

      curNum === 1 ? console.log(this.firstCurrJson) : console.log(this.secondCurrJson);
      
    })
  }

  // "USD"
  // "UAH"
  onFirstInput() {
    if (this.firstCurrency === this.secondCurrency) {
      this.input2.setValue(this.input.value);
      this.input.setValue(this.input2.value);
    } else {      
      switch (this.secondCurrency) {
        case "UAH":
          this.input2.setValue(this.input.value * this.firstCurrJson.rates["UAH"]);
          console.log(this.secondCurrency);
          break;
        case "EUR":
          this.input2.setValue(this.input.value * this.firstCurrJson.rates["EUR"]); 
          console.log(this.secondCurrency);
          break;
        case "USD":
          this.input2.setValue(this.input.value * this.firstCurrJson.rates["USD"]); 
          console.log(this.secondCurrency);          
          break;
      }
    }
  } 

  onSecondInput() {
    if (this.secondCurrency === this.firstCurrency) {
      this.input.setValue(this.input2.value);
      this.input2.setValue(this.input.value);
    } else {      
        switch (this.firstCurrency) {
          case "UAH":
            this.input.setValue(this.input2.value * this.secondCurrJson.rates["UAH"]);
            break;
          case "EUR":
            this.input.setValue(this.input2.value * this.secondCurrJson.rates["EUR"]); 
            console.log(this.secondCurrency);
            break;
          case "USD":
            this.input.setValue(this.input2.value * this.secondCurrJson.rates["USD"]); 
            console.log(this.secondCurrency);          
            break;
        }
      }
    }
}

