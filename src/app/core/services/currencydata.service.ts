import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CurrencyResponceModel } from '@app/shared/models';


@Injectable({
  providedIn: 'root'
})
export class CurrencydataService {

  constructor(private http: HttpClient) { }

  getCurrencyData(currency: string): Observable<CurrencyResponceModel> {
    let url = `https://api.exchangerate.host/latest?base=${currency}`;

    return this.http.get<CurrencyResponceModel>(url);
  }
 }
