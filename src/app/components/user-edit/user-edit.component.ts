import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: string="";
  controller: string = "users";
  user: UserModel = new UserModel();
  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private router: Router) { 
     

  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')??''; 

    this.apiService.getById(this.controller, this.id).subscribe((resp: any)=>{
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
    };
    this.apiService.put(this.controller, this.user).subscribe((resp: any)=>{
        this.router.navigateByUrl('users');
    },
    (error: any)=>{
      console.error(error);
      Swal.fire(
        {
          title: 'Error',
          text: 'Error al actualizar registros',
          icon: 'error'
        }
      );
    });
  }

}
