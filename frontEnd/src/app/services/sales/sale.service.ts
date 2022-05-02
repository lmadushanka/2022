import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globale } from '../../modules/globals';
import { SalesModule } from '../../modules/salesModule';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${'Bearer '+localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  baseUrl = new Globale();

  constructor(
    private http: HttpClient
  ) { }


  addSale(saleModule : SalesModule):Observable<any>{
    let salesUrl = this.baseUrl.Url + 'sales'

    return this.http.post(salesUrl,saleModule, httpOptions);
  }

  getAllSales():Observable<any>{
    let salesUrl = this.baseUrl.Url + 'sales'

    return this.http.get(salesUrl, httpOptions);
  }

  getFreeIssue(id:any):Observable<any>{
    let salesUrl = this.baseUrl.Url + 'sales/free-issue/' + id;

    return this.http.get(salesUrl, httpOptions);
  }

  filterSales(paymentStatus:any, salesStatus:any):Observable<any>{
    let salesUrl = this.baseUrl.Url + 'sales/filter/'+paymentStatus+'/'+salesStatus;

    return this.http.get(salesUrl, httpOptions);
  }
}
