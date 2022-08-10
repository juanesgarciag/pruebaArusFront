import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  NewUser: UserModel = new UserModel()

  constructor(private authService: AuthService, 
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit(): void {
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
    this.apiService.post('users', this.NewUser).subscribe((resp: any)=>{
      this.router.navigateByUrl('users');
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
