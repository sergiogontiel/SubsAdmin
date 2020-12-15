import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../usuarios.service';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class NuevoSubService {

  private subCollection: AngularFirestoreCollection<Item>;

  items: Observable<Item[]>;

  private itemDoc:AngularFirestoreDocument<Item>;

  private myUserId = firebase.auth().currentUser.uid;

  constructor(private firestore:AngularFirestore) {
    this.subCollection = firestore.collection('usuarios').doc(this.myUserId).collection<Item>('subscripciones');

    this.items = this.subCollection.snapshotChanges().pipe(
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
    this.subCollection.add(item);
  }

  eliminarItem(item) {
    this.itemDoc = this.firestore.doc<Item>(`usuarios/${this.myUserId}/subscripciones/${item.id}`);
    this.itemDoc.delete();
  }

  editarItem(item) {
    this.itemDoc = this.firestore.doc<Item>(`usuarios/${this.myUserId}/subscripciones/${item.id}`);
    this.itemDoc.update(item);
  }

}
