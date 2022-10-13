import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrencydataService {

  constructor(private http: HttpClient) { }

  getCurrencyData(currency: string): Observable<any> {
    let url = `https://api.exchangerate.host/latest?base=${currency}`;

    return this.http.get<any>(url);
  }
 }
