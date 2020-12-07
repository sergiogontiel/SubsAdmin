import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UsuariosService } from '../usuarios.service';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Usuarios } from '../usuarios.model';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers:[]
})
export class SignInComponent implements OnInit {

  signInForm= new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })


  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private passwordPattern : any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  constructor(public afAuth:AngularFireAuth, public authService:AuthService,private router: Router, private firestore:AngularFirestore) {
    this.signInForm = this.createFormGroup();
   }


  createFormGroup() {
   return new FormGroup({
    email: new FormControl(''),
    displayName : new FormControl(''),
    password : new FormControl(''),
    });
  }


 ngOnInit(): void {}


 async onRegister() {
  const { email, password} = this.signInForm.value;
  try {
    const user = await this.authService.register(email, password);
    this.router.navigate(['subscripciones']);
  } catch (error) {
    console.log(error);
  }
}

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }
  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLoginRedirect(): void {
    this.router.navigate(['subscripciones']);
  }



  get name(){
    return this.signInForm.get("name");
  }

  get email(){
    return this.signInForm.get("email");
  }

  get password(){
    return this.signInForm.get("password");
  }

  private checkUserIsVerified(user: Usuarios) {
    if (user && user.emailVerified) {
      this.router.navigate(['/subscripciones']);
    } else if (user) {
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

}
