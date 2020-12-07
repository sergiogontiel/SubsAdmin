import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../usuarios.model';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuariosService } from '../usuarios.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  item:any = {
    name:''
  }

  items:any;

  editarItem:any = {
    name:''
  }

  usuarios:Observable<any[]>;

  constructor(public usuariosService:UsuariosService, private db:AngularFirestore) {
    this.usuarios = this.db.collection('usuarios').valueChanges();
    this.usuariosService.userItem().subscribe(item=>{
      this.items = item;
      console.log(this.items);
    })
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

  ngOnInit(): void {}

  create(usuarios: Usuarios){
    this.usuariosService.createUsuarios(usuarios);
  }

  update(usuarios: Usuarios) {
    this.usuariosService.updateUsuarios(usuarios);
  }

  delete(id: string) {
    this.usuariosService.deleteUsuarios(id);
  }

}
