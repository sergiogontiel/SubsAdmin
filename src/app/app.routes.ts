import { Route } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SubscripcionesComponent } from './subscripciones/subscripciones.component';
import { PagosComponent } from './pagos/pagos.component';
import { AnadirSubscripcionComponent } from './anadir-subscripcion/anadir-subscripcion.component';
import { UserNewComponent } from './user-new/user-new.component';


export const APP_ROUTES:Route[] = [
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-in', component:SignInComponent},
  {path: 'subscripciones', component:SubscripcionesComponent},
  {path: 'anadirSubs', component:AnadirSubscripcionComponent},
  {path: 'userNew', component:UserNewComponent},
  {path: 'pagos', component:PagosComponent},
  {path: "", redirectTo: '/main', pathMatch: 'full'},
  {path: '**', redirectTo: '/main', pathMatch: 'full'}
];
