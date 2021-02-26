import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private auth:AuthService,private router:Router) { }

  loginForm: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  
  Validations(): boolean{
    if (this.loginForm.controls.email.errors) {
      if (this.loginForm.controls.email.errors.required) {
        // this.OpenModal();
      }else if (this.loginForm.controls.email.errors.email) {
        // this.OpenModal();
      }
      return false;
    }else if (this.loginForm.controls.password.errors) {
      if (this.loginForm.controls.password.errors.required) {
        // this.OpenModal();
      }
      return false;
    }
    return true;
  }

  OpenModal():void{

  }

  SignIn(): void{
    if (!this.Validations()) {
      return;
    }
    let result=this.auth.Login(this.loginForm.get('email').value, this.loginForm.get('password').value);
    if (result) {
      this.router.navigate(["/person"]);
    }else{
      this.OpenModal();
    }
  }
}
