import { Component, OnInit } from '@angular/core';
import { ServerModel } from '../../models/server.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.css']
})
export class ServerEditComponent implements OnInit {

  id: string="";
  controller: string = "servers";
  server: ServerModel = new ServerModel();
  user: UserModel = new UserModel();

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private router : Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')??''; 

    this.apiService.getById(this.controller, this.id).subscribe((resp: any)=>{
      this.server = resp;
    });

    this.apiService.getById('users', localStorage.getItem(environment.idUser)??'').subscribe((resp: any)=>{
      this.user = resp;
    });
  };

  submit( form: NgForm){
debugger;
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
    this.apiService.put(this.controller, this.server).subscribe((resp: any)=>{
        this.router.navigateByUrl('servers');
        console.log(resp)
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
