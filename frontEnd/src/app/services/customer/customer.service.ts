import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globale } from '../../modules/globals';
import { Observable } from 'rxjs';
import { CustomerModule } from 'src/app/modules/customer';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${'Bearer '+localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  baseUrl = new Globale();

  getAllCustomer():Observable<any>{

    let customerUrl = this.baseUrl.Url+'customer';

    return this.http.get(customerUrl,httpOptions);
  }

  createCustomer(customerModule: CustomerModule):Observable<any>{
    let customerUrl = this.baseUrl.Url+'customer';

    return this.http.post(customerUrl, customerModule, httpOptions);
  }

  getCustomerById(id:any):Observable<any>{
    let customerUrl = this.baseUrl.Url+'customer/' + id;

    return this.http.get(customerUrl, httpOptions);
  }

  updateCustomer(customerModule: CustomerModule, id:any):Observable<any>{
    let customerUrl = this.baseUrl.Url+'customer/' + id;

    return this.http.patch(customerUrl, customerModule, httpOptions);
  }

  deleteCustomer(id:any):Observable<any>{
    let customerUrl = this.baseUrl.Url+'customer/delete/'+ id;

    return this.http.patch(customerUrl,null,httpOptions);
  }

  getCustomerSalesCount(id:any):Observable<any>{
    let customerUrl = this.baseUrl.Url+'customer-history/sales-count/'+ id;

    return this.http.get(customerUrl,httpOptions);
  }

  getCustomerSalesCustomerWise(id:any):Observable<any>{
    let customerUrl = this.baseUrl.Url+'customer-history/'+ id;

    return this.http.get(customerUrl,httpOptions);
  }

  customerGrandTotal(id:any):Observable<any>{
    let customerUrl = this.baseUrl.Url+'customer-history/grand-total/'+ id;

    return this.http.get(customerUrl,httpOptions);
  }

  customerPaidTotal(id:any):Observable<any>{
    let customerUrl = this.baseUrl.Url+'customer-history/paid-total/'+ id;

    return this.http.get(customerUrl,httpOptions);
  }

  getCustomerCount():Observable<any>{
    let customerUrl = this.baseUrl.Url+'customer/customerCount';

    return this.http.get(customerUrl, httpOptions);
  }

}
