import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globale } from '../../modules/globals';
import { UserModule } from '../../modules/userModule'
import { Observable } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${'Bearer '+localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = new Globale();

  constructor(private http  : HttpClient) { }

  createUser(userModule : UserModule):Observable<any>{
    let userUrl = this.baseUrl.Url+'user';
    
    return this.http.post<any>(userUrl, userModule, httpOptions);
  }

  getAllUser():Observable<any>{
    let userUrl = this.baseUrl.Url+'user';

    return this.http.get<any>(userUrl,httpOptions);
  }

  getUserById(id:any):Observable<any>{
    let userUrl = this.baseUrl.Url+'user/' + id;

    return this.http.get(userUrl, httpOptions);
  }

  updateUserById(userModule: UserModule, id:any):Observable<any>{
    let userUrl = this.baseUrl.Url+'user/'+ id;

    return this.http.patch(userUrl, userModule, httpOptions);
  }

  delete(id:any):Observable<any>{

    console.log(id);
    

    let userUrl = this.baseUrl.Url+'user/'+id;
    
    return this.http.delete(userUrl,httpOptions);
  }
}
