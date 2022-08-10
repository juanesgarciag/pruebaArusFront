import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient,
               private auth: AuthService ) { }

  get(controller: string ){
    return this.http.get(`${environment.urlApi}${controller}`, {headers: this.auth.getHeaders()});
  }
  getAction(controller: string, action: string, id: string ){
    return this.http.get(`${environment.urlApi}${controller}/${action}/${id}`, {headers: this.auth.getHeaders()});
  }
  getById(controller: string, id: string ){
    return this.http.get(`${environment.urlApi}${controller}/${id}`, {headers: this.auth.getHeaders()});
  }

  post(controller: string, data: any){
    return this.http.post(`${environment.urlApi}${controller}`,data, {headers: this.auth.getHeaders()});
  }

  put(controller: string, data: any){
    return this.http.put(`${environment.urlApi}${controller}/${data._id}`,data, {headers: this.auth.getHeaders()});
  }
  delete(controller: string, id: string){
    return this.http.delete(`${environment.urlApi}${controller}/${id}`, {headers: this.auth.getHeaders()});
  }
}
