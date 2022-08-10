import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { AuthModel } from '../models/auth.model';
import { TokenResponseModel } from '../models/token-response.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = ''

  constructor(private http: HttpClient, private router: Router ) {
    this.url = environment.urlApi;
  }

  login( user: AuthModel)
  {
      return this.http.post(`${ this.url }auth/login`, user);
  }
  getLogin() : boolean{
    let isLoggin = false;
    let localStorageReturn = atob(localStorage.getItem(environment.isLogin)??"");
    isLoggin = (localStorageReturn === "afirmative");
    return isLoggin;
  }
  getToken() : string {
    console.log(localStorage.getItem(environment.token)??"");
    return localStorage.getItem(environment.token)??"";
  }
  getHeaders(){
    return new HttpHeaders({Authorization: `${this.getToken()}`});
  }

  loggout()
  {
    
    localStorage.removeItem(environment.token);
    localStorage.removeItem(environment.isLogin);
    this.router.navigateByUrl("login");
  }

}