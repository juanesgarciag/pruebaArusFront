import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ServerModel } from '../../models/server.model';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-newserver',
  templateUrl: './newserver.component.html',
  styleUrls: ['./newserver.component.css']
})
export class NewserverComponent implements OnInit {

  NewServer: ServerModel = new ServerModel();
  user: UserModel = new UserModel();

  constructor(private authService: AuthService, 
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getById('users', localStorage.getItem(environment.idUser)??'').subscribe((resp: any)=>{
      this.user = resp;
    });
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

    this.NewServer.userAssociated = this.user._id;
    this.apiService.post('servers', this.NewServer).subscribe((resp: any)=>{
      this.router.navigateByUrl('servers');
    }, (error: any) => {
      
      Swal.fire(
        {
          title: 'Error',
          text: 'Al momento de guardar',
          icon: 'error'
        }
      );
    });
  }

}
