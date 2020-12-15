import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { NuevoSubService } from '../services/nuevo-sub.service';
import { UsuariosService } from '../usuarios.service';
import { Item } from '../usuarios.service';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'anadir-subscripcion',
  templateUrl: './anadir-subscripcion.component.html',
  styleUrls: ['./anadir-subscripcion.component.css']
})
export class AnadirSubscripcionComponent implements OnInit {

  item:any = {
    nombreSubs:'',
    precioSubs:'',
    vencimientoSubs:''
  }

  items:any;

  subscripciones:Observable<any[]>;

  anadirForm:FormGroup;

  private myUserId = firebase.auth().currentUser.uid;

  constructor( private firestore: AngularFirestore, private usuariosService:NuevoSubService, private router:Router ) {
    this.anadirForm = this.anadirFormGroup();
    this.subscripciones = this.firestore.collection('usuarios').doc(this.myUserId).collection<Item>('subscripciones').valueChanges();
    this.usuariosService.userItem().subscribe(item=>{
      this.items = item;
    })
  }

  anadirFormGroup() {
    return new FormGroup({
      nombreSubs: new FormControl(''),
      precioSubs: new FormControl(''),
      vencimientoSubs: new FormControl('')
    });
  }

  agregar(){
    this.usuariosService.agregarItem(this.item);
    this.router.navigate(["/subscripciones"]);
  }

  ngOnInit(): void {
  }

}
