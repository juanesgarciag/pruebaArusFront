import { Component, Input, OnInit } from '@angular/core';
import { ServerModel } from '../../models/server.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  @Input () tipo: boolean=true;

  servers: ServerModel[] = [];
  controller: string = "servers";

  constructor(private apiService: ApiService,
              private router: Router) { }

  ngOnInit(): void {

    //recuperar localstorage id y enviar en el nuevo get
    this.apiService.get('servers').subscribe((resp: any) => {
      this.servers = resp.docs;
      console.log(this.servers);
    });
  }

  editar(id: string){
    this.router.navigate(['serveredit',id]);
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
             this.servers.splice(idx,1);
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

}
