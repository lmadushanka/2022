import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globale } from '../../modules/globals';
import { Observable } from 'rxjs';
import { RouteModule } from 'src/app/modules/routeModule';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${'Bearer '+localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  baseUrl = new Globale();

  constructor( private http : HttpClient) { }

  addRoute(routeModule: RouteModule):Observable<any>{
    let routeUrl = this.baseUrl.Url+'route';

    return this.http.post(routeUrl, routeModule, httpOptions);
  }

  getAllRoute():Observable<any>{

    let routeUrl = this.baseUrl.Url+'route';

    return this.http.get(routeUrl,httpOptions);
  }

  getRouteById(id:any):Observable<any>{

    let routeUrl = this.baseUrl.Url+'route/'+id;

    return this.http.get(routeUrl,httpOptions);
  }

  updateRoute(routeModule:RouteModule, id:any):Observable<any>{
    let routeUrl = this.baseUrl.Url+'route/'+id;

    return this.http.patch(routeUrl,routeModule, httpOptions);
  }

  deleteRoute(id:any):Observable<any>{
    let routeUrl = this.baseUrl.Url+'route/'+id;

    return this.http.delete(routeUrl,httpOptions);
  }
}
