import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'subsAdmin',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'subs-admin';

  constructor(public auth: AngularFireAuth) {}

  logout() {
    this.auth.signOut();
  }
}
