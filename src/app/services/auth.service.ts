import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { Usuarios } from '../usuarios.model';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) {

    const user$ = this.afsAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<Usuarios>(`usuarios/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  register(email:string, password:string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user)
        }).catch(err => console.log(reject(err)))
    });
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afsAuth.currentUser).sendEmailVerification();
  }

  loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  loginFacebookUser() {
    return this.afsAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }

  loginGoogleUser() {
    return this.afsAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }

  logoutUser() {
    return this.afsAuth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user: Usuarios) {
    const userRef: AngularFirestoreDocument<Usuarios> = this.afs.doc(
      `usuarios/${user.uid}`
    );

    const data: Usuarios = {
      uid: user.uid,
      email: user.email,
      roles: {
        editor: true
      }
    };

    return userRef.set(data, { merge: true });
  }

  isUserEditor(userUid) {
    return this.afs.doc<Usuarios>(`usuarios/${userUid}`).valueChanges();
  }


}
