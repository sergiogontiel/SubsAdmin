import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private passwordPattern: any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  constructor(private location:Location) {
    this.loginForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      usuario: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.passwordPattern)]),
      checkbox: new FormControl(false, [Validators.requiredTrue]),

    });
  }

  resetForm(){
    this.loginForm.reset();
  }

  sendForm(){
    if (this.loginForm.valid){
      console.log('Message sended');
    } else {
      console.log('Nop');
    }
    this.resetForm();
  }


get usuario() {return this.loginForm.get('usuario')}
get email() {return this.loginForm.get('email')}
get password() {return this.loginForm.get('password')}
get checkbox() {return this.loginForm.get('checkbox')}
}
