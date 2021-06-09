import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PriceHistory {
  success : string,
  message : string,
  result : PriceItem[],
  explanation : null
}

export interface PriceItem {
  O : number,
  H : number,
  L : number,
  C : number,
  V : number,
  T : string,
  BV : number
}

@Injectable({
  providedIn: 'root'
})
export class BittrexService {

  constructor(private http: HttpClient) { }

  public getPrices(): Observable<PriceHistory> {
    const URL = 'http://localhost:4200/api';
    return this.http.get<PriceHistory>(URL);
  }

}
