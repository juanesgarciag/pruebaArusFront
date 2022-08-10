import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthModel } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario: AuthModel = new AuthModel();

  constructor( private authService: AuthService, 
               private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getLogin()){
      this.router.navigateByUrl("dashboard");
    }
  }
  submit( form: NgForm){
    if (form.invalid) {
      Object.values(form.controls).forEach( ctrl => {
        ctrl.markAsTouched();
      });

      Swal.fire(
        {
          title: 'Error',
          text: 'Hacen falta campos obligatorios',
          icon: 'error'
        }
      );
      return;
    }

    this.authService.login(this.usuario).subscribe(
      (resp: any) => {
        console.log(resp);
              localStorage.setItem(environment.token, resp.tokenJWT);
              localStorage.setItem(environment.idUser, resp.user._id);
              localStorage.setItem(environment.isLogin, btoa("afirmative"));
              this.router.navigateByUrl("dashboard");
          },
          (error: any)=>{
            console.log(error.error.msg);
            Swal.fire(
              {
                title: 'Error',
                text: error.error.msg,
                icon: 'error'
              }
            );
          });

  }

}
