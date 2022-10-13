import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencydataService } from './currencydata.service';

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
    })
  }

  onFirstInput() {
    if (this.firstCurrency === this.secondCurrency) {
      this.input2.setValue(this.input.value);
      this.input.setValue(this.input2.value);
    }       
    
    switch (this.secondCurrency.toLocaleLowerCase()) {
      case "uah":
        this.input2.setValue(this.input.value * this.firstCurrJson.rates["UAH"]);
        console.log(this.secondCurrency);
        break;
      case "eur":
        this.input2.setValue(this.input.value * this.firstCurrJson.rates["EUR"]); 
        console.log(this.secondCurrency);
        break;
      case "usd":
        this.input2.setValue(this.input.value * this.firstCurrJson.rates["USD"]); 
        console.log(this.input.value);          
        break;
    }
    
  } 

  onSecondInput() {
    if (this.secondCurrency === this.firstCurrency) {
      this.input.setValue(this.input2.value);
      this.input2.setValue(this.input.value);
    } 
        
    switch (this.firstCurrency.toLocaleLowerCase()) {
      case "uah":
        this.input.setValue(this.input2.value * this.secondCurrJson.rates["UAH"]);
        break;
      case "eur":
        this.input.setValue(this.input2.value * this.secondCurrJson.rates["EUR"]); 
        console.log(this.secondCurrency);
        break;
      case "usd": 
        this.input.setValue(this.input2.value * this.secondCurrJson.rates["USD"]); 
        console.log(this.secondCurrency);          
        break;
    }
      
  }
}

