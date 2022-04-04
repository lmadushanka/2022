import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globale } from 'src/app/modules/globals';
import { StockModule } from '../../modules/stockModule';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${'Bearer '+localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class StockService {

  baseUrl = new Globale();

  constructor(
    private http: HttpClient
  ) { }

  createStock(stockModule:StockModule):Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock';

    return this.http.post(stockUrl, stockModule, httpOptions);
  }

  getAll():Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock/all-sum';

    return this.http.get(stockUrl, httpOptions);
  }

  getStockByRoute(routeId:any):Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock/route/'+ routeId;

    return this.http.get(stockUrl, httpOptions);
  }

  delete(id:any):Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock/'+ id;

    return this.http.delete(stockUrl, httpOptions);
  }
}