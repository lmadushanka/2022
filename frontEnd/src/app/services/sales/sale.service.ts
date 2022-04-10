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

  getAllSales():Observable<any>{
    let salesUrl = this.baseUrl.Url + 'sales'

    return this.http.get(salesUrl, httpOptions);
  }

  getFreeIssue(id:any):Observable<any>{
    let salesUrl = this.baseUrl.Url + 'sales/free-issue/' + id;

    return this.http.get(salesUrl, httpOptions);
  }
}
