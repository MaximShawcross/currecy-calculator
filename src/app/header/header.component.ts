import { Component, OnInit } from '@angular/core';
import { CurrencydataService } from '../currencydata.service';  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
  
  euro: any;
  dollar: any;

  constructor( private currency: CurrencydataService ) { }

  ngOnInit(): void {
    this.currency.getCurrencyData("eur").subscribe( data => {
      this.euro = JSON.stringify(data);
      this.euro = JSON.parse(this.euro);
      this.euro = this.euro.rates["UAH"];
    })

    this.currency.getCurrencyData("usd").subscribe( data => {
      this.dollar = JSON.stringify(data);
      this.dollar = JSON.parse(this.dollar);
      this.dollar = this.dollar.rates["UAH"];
      console.log(this.dollar.rates["UAH"]);
    })



  }


}
