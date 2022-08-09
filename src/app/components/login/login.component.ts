import { Component, OnInit } from '@angular/core';
import { AuthModel } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    debugger;
    let usuario: AuthModel = new AuthModel();
    usuario.email = "prueba1@correo.com";
    usuario.password = "pass1234";

    this.authService.login(usuario);
  }

}
