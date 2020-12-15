import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Item } from '../usuarios.service';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { NuevoSubService } from '../services/nuevo-sub.service';

@Component({
  selector: 'pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  item:any = {
    name:''
  }


  items:Observable<any> = this.nuevoSub.items

  private subCollection: AngularFirestoreCollection<Item>;

  private myUserId = firebase.auth().currentUser.uid;

  constructor(private firestore:AngularFirestore, private nuevoSub:NuevoSubService) {
    this.subCollection = firestore.collection('usuarios').doc(this.myUserId).collection<Item>('subscripciones');

    this.items = this.subCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit(): void {
  }

}
