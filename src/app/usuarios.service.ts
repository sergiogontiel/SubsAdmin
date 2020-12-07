import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuarios, Subscripciones, Roles } from 'src/app/usuarios.model';
import { map } from 'rxjs/operators';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  roles: Roles;

  private itemDoc:AngularFirestoreDocument<Item>;

  createUsers(email: any) {
    throw new Error('Method not implemented.');
  }

  userId:string;

  constructor(private firestore:AngularFirestore) {
    this.itemsCollection = firestore.collection<Item>('usuarios');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  userItem(){
    return this.items;
  }

  agregarItem(item: Item) {
    this.itemsCollection.add(item);
  }

  eliminarItem(item) {
    this.itemDoc = this.firestore.doc<Item>(`usuarios/${item.id}`);
    this.itemDoc.delete();
  }

  editarItem(item) {
    this.itemDoc = this.firestore.doc<Item>(`usuarios/${item.id}`);
    this.itemDoc.update(item);
  }

  /* cosas nuevas */

  getUsuarios() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  createUsuarios(usuarios: Usuarios){
    return this.firestore.collection('usuarios').add(usuarios);
  }

  updateUsuarios(usuarios: Usuarios){
    delete usuarios.uid;
    this.firestore.doc('usuarios/' + usuarios.uid).update(usuarios);
  }

  deleteUsuarios(usuariosId: string){
    this.firestore.doc('usuarios/' + usuariosId).delete();
}

}
