import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { AuthModel } from '../models/auth.model';
import { TokenResponseModel } from '../models/token-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = ''

  constructor(private http: HttpClient ) {
    this.url = environment.urlApi;
  }

  login( user: AuthModel)
  {


    return this.http.post(`${ this.url }auth/login`, user)
      .pipe(
        map( (resp: any) => {
        //   if (resp.response)
        //   {
            
        //     localStorage.setItem('isLoggedin', 'true');
        //     localStorage.setItem('token', resp.result.token);
        //     localStorage.setItem('login', resp.result.login);
        //     localStorage.setItem('userName', resp.result.userName);
        //     localStorage.setItem('expires', resp.result.expires);
        //     localStorage.setItem('idUserLogin', resp.result.idUser);
        //     localStorage.setItem('idProfile', resp.result.idProfile);
        //  }
        //  else {
        //   Swal.fire(
        //     {
        //       title: 'Error',
        //       text: 'Error en el usuario y/o la contraseña',
        //       icon: 'error'
        //     }
        //   );
        //  }
        console.log(resp);
          return resp;
        })
      );
  }

  // loggout()
  // {
    
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('login');
  //   localStorage.removeItem('idUserLogin');
  //   localStorage.removeItem('userName');
  //   localStorage.removeItem('isLoggedin');
  //   localStorage.removeItem('idProfile');
  //   localStorage.removeItem('expires');
  //   localStorage.removeItem('isExternal');
  // }

  // isLoggedin(){
  //   let resp = false;
  //   if (localStorage.getItem('isLoggedin')==='true')
  //   {

  //     let stringDateExpire = localStorage.getItem('expires');
  //     let DateExpire = new Date(stringDateExpire);
  //     if (DateExpire <= new Date())
  //     {
  //       resp = false;
      
  //     }
  //     else
  //     {
      
  //       resp = true;
  //     }
          
  //   }
  //   return resp;
  // }

  // getToken(): string {
  //   let token = '';
  //   if (this.isLoggedin())
  //   {
  //    token = localStorage.getItem('token');
  //   }
  //   return token;
  // }

  // getHeaders(){
  //   return new HttpHeaders({Authorization: `Bearer ${this.getToken()}`});

  // }

}