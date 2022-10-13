import { Component, OnInit } from '@angular/core';
import { CurrencydataService } from "@app/services";  
import { CurrencyCodes, CurrencyResponceModel } from '@app/shared/models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
  euroRate!:  number;
  dollarRate!: number;

  constructor( private currency: CurrencydataService ) { }

  ngOnInit(): void {
    this.currency.getCurrencyData(CurrencyCodes.EUR).subscribe( ( data : CurrencyResponceModel) => {
      this.euroRate = data.rates[CurrencyCodes.UAH];
    })

    this.currency.getCurrencyData(CurrencyCodes.USD).subscribe(( data: CurrencyResponceModel )=> {
      this.dollarRate = data.rates[CurrencyCodes.UAH];
    })
  }


}
