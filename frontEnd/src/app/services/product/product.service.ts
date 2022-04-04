import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globale } from '../../modules/globals';
import { Observable } from 'rxjs';
import { ProductModule } from '../../modules/productModule';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${'Bearer '+localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = new Globale();

  constructor(
    private http: HttpClient
  ) { }

  addProduct(productModule: ProductModule):Observable<any>{
    let productUrl = this.baseUrl.Url+'product';

    return this.http.post(productUrl, productModule, httpOptions);
  }

  updateProduct(productModule: ProductModule, id:any):Observable<any>{
    let productUrl = this.baseUrl.Url+'product/'+ id;

    return this.http.patch(productUrl, productModule, httpOptions);
  }

  getAllProduct():Observable<any>{
    let productUrl = this.baseUrl.Url+'product';

    return this.http.get(productUrl, httpOptions);
  }

  getProductById(id:any):Observable<any>{
    let productUrl = this.baseUrl.Url+'product/'+ id;

    return this.http.get(productUrl, httpOptions);
  }

  deleteProduct(id:any):Observable<any>{
    let productUrl = this.baseUrl.Url+'product/'+ id;

    return this.http.delete(productUrl, httpOptions);
  }

}
