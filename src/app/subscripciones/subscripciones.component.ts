import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NuevoSubService } from '../services/nuevo-sub.service';

@Component({
  selector: 'subscripciones',
  templateUrl: './subscripciones.component.html',
  styleUrls: ['./subscripciones.component.css']
})
export class SubscripcionesComponent implements OnInit {

  item:any = {
    name:''
  }

  editarItem:any = {
    name:''
  }

  items:Observable<any> = this.nuevoSub.items

  constructor(private nuevoSub:NuevoSubService, private usuariosService:NuevoSubService) { }

  ngOnInit(): void {
  }

  agregar(){
    this.usuariosService.agregarItem(this.item);
    this.item.name = '';
  }

  eliminar(item){
    this.usuariosService.eliminarItem(item);
  }

  editar(item){
    this.editarItem = item;
  }

  agregarItemEditado(){
    this.usuariosService.editarItem(this.editarItem);
  }

}
