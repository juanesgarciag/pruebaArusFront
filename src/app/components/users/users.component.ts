import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserModel[] = [];
  controller: string = "users";
  constructor(
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.apiService.get(this.controller).subscribe((resp: any)=> {
      this.users = resp.docs;
      console.log(this.users)
    });
  }
  editar(id: string){
    this.router.navigate(['useredit',id]);
  }
  eliminar(id: string, idx: number){
    Swal.fire(
      {
        title: 'Eliminar Registro',
        text: '¿Desea Eliminar el Registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
      }
    ).then((result)=> {
      if (result.isConfirmed) {
        this.apiService.delete(this.controller, id).subscribe(
          (resp:any) =>
          {

            if (resp.error) {
                Swal.fire('Error al Eliminar el Registro','Se presentó un error al eliminar el registro', 'error');
            } else {
             this.users.splice(idx,1);
              Swal.fire('Registro Eliminado', '', 'success');

            }
          },
          (error: any)=>{
            Swal.fire('Error al Eliminar el Registro',error.error.msg, 'error');

            console.log(error);
          }
        );

      }
    });
  }
  servidores(id: string){

  }

}
