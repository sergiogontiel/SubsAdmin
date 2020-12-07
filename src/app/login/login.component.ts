import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuariosService } from 'src/app/usuarios.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuarios } from '../usuarios.model';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(public auth: AngularFireAuth, private firestore:AngularFirestore) {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      email: new FormControl(''),
      password : new FormControl('')
    });
  }

    /* Roles */

    private updateUserData(user) {
      const userRef:AngularFirestoreDocument<any> = this.firestore.doc(`usuarios/${user.uid}`);
      const data: Usuarios = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.email,
        displayName: user.name,
        roles: {
          editor: true,
        }
      }
      return userRef.set(data, {merge:true})
    }

    /* Roles */

  ngOnInit(): void {

  }

  loginEmail(){
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    this.auth.signInWithEmailAndPassword(email, password).then(function(user){
      console.log('Credenciales correctas, brother, bienvenido.')
    }).catch(function (error){
      console.log(error);
    });
  }

  onFacebookLogin(){
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(credential => this.updateUserData(credential.user))
  }

  onGoogleLogin(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(credential => this.updateUserData(credential.user))
  }

  onLogin(){
    console.log('From ->', this.loginForm.value);
  }

  logout() {
    this.auth.signOut();
  }


}
