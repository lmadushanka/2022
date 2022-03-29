import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globale } from '../../modules/globals';
import { Auth } from '../../modules/authModule'
import { Observable } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${'Bearer '+localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = new Globale();

  constructor(private http  : HttpClient) { }

  signIn(authModule : Auth):Observable<any>{
    let signInUrl = this.baseUrl.Url+'login';
    
    return this.http.post<any>(signInUrl, authModule);
  }

  checkToken():Observable<any>{
    let checkTokenUrl = this.baseUrl.Url+'login/token';
    
    return this.http.get<any>(checkTokenUrl,httpOptions);
  }
}
