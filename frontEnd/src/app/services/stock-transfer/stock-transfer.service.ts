import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globale } from 'src/app/modules/globals';
import { StockTransferModule } from '../../modules/stockTransferModule';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${'Bearer '+localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class StockTransferService {

  constructor( private http: HttpClient) { }

  baseUrl = new Globale();

  addStockTransfer(stockTransferModule: StockTransferModule):Observable<any>{
    let stockTransferUrl = this.baseUrl.Url+'stockTransfer';

    return this.http.post(stockTransferUrl, stockTransferModule, httpOptions);
  }

  getAllStockTransfer():Observable<any>{
    
    let stockTransferUrl = this.baseUrl.Url + 'stockTransfer';
    

    return this.http.get(stockTransferUrl, httpOptions);
  }

  
}
