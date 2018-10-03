import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { login } from '../shared/loginForm'
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { dataFormat } from '../shared/loginDataFormat';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { RouterLink } from '@angular/router';
// import { userInfo } from 'os';

// import { of, Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // loginForm :FormGroup;
  // login :login
  // constructor(private fb: FormBuilder) {
  //   this.createForm();
  // }
  // ngOnInit() {
  // }
  // createForm() {
  //   this.loginForm = this.fb.group({
  //     email: ['', Validators.required ],
  //     password:['', Validators.required ],
  //   });
  // }
  // onSubmit() {
  //   this.login = this.loginForm.value;
  //   console.log(this.login);
  //   this.loginForm.reset();
  // }

  user = { email: '', password: '' };

  constructor(private dataService: LoginService,
    private _router: Router,
    @Inject('BaseURL') private BaseURL) { }

  loginStatus = {};
  data = {};
  errMess: string;

  ngOnInit() {
  }

  onSubmit() {
    console.log('User: ', this.user)
  }
  // getData(){
  //   this.dataService.getData()
  //   .subscribe(userData => this.data= userData,
  //   errmess => this.errMess = <any>errmess);
  //   console.log(this.data); 
  // }
  // getData() {
  //   this.dataService.getData(this.user)
  //     .then(dishes => console.log(dishes));

  // }

  getData() {
    // debugger;
    this.dataService.getData(this.user)
      .then(response => response.json())
      .then(data => {
        if (data == true) {
          console.log( this.data)
          this._router.navigate(['details'])
        }
      })
  }
  // routeToDetails() {
  //     this._router.navigate(['/details'])
  // }
  // sendData() {
  //   this.dataService.sendData(this.user)
  //     .then(dishes => console.log(dishes));
  //     console.log( this.user)
  // }

  sendData() {
    // debugger;
    let content = this.dataService.sendData(this.user)
    console.log(content);
    // this.getData();
    // .subscribe(userData => this.data= userData,
    // errmess => this.errMess = <any>errmess);   
  }


}


