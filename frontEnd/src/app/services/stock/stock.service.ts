import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globale } from '../../modules/globals';
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
    let stockUrl = this.baseUrl.Url+'stock/';

    return this.http.post(stockUrl, stockModule, httpOptions);
  }

  getAll():Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock/';

    return this.http.get(stockUrl, httpOptions);
  }

  
  getStockById(id:any):Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock/'+id;
    
    return this.http.get(stockUrl, httpOptions);
  }
  
  getStockAmount(stockModule:any):Observable<any>{

    let stockTransferUrl = this.baseUrl.Url + 'stock/amount';
    

    return this.http.post(stockTransferUrl, stockModule, httpOptions);
  }

  updateQty(stockModule: StockModule, id: any):Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock/qty/'+id;

    return this.http.patch(stockUrl, stockModule, httpOptions);
  }

  updateRecieved(stockModule: StockModule,id:any):Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock/recieved/'+id;

    return this.http.patch(stockUrl, stockModule, httpOptions);
  }

  rejectStock(stockModule: StockModule,id:any):Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock/reject/'+id;

    return this.http.patch(stockUrl, stockModule, httpOptions);
  }

  delete(id:any):Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock/delete/'+ id;

    return this.http.patch(stockUrl, StockModule, httpOptions);
  }

  getAllSum():Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock/stock-amount-group-by-product';

    return this.http.get(stockUrl, httpOptions);
  }

  getStockByRoute(routeId:any):Observable<any>{
    let stockUrl = this.baseUrl.Url+'stock-transfer/route-by/'+ routeId;
  
    return this.http.get(stockUrl, httpOptions);
  }
}
