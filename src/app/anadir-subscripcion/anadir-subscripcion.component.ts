import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'anadir-subscripcion',
  templateUrl: './anadir-subscripcion.component.html',
  styleUrls: ['./anadir-subscripcion.component.css']
})
export class AnadirSubscripcionComponent implements OnInit {

  anadirForm:FormGroup;

  constructor( private firestore: AngularFirestore ) {
    this.anadirForm = this.anadirFormGroup();
  }
  tipos: any = ['Mensual','Anual'];

  anadirFormGroup() {
    return new FormGroup({
      nombreSubs: new FormControl(''),
      tipoSubs: new FormControl(''),
      precioSubs: new FormControl(''),
      vencimientoSubs: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

}
