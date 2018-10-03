import { Injectable } from '@angular/core';
import { dataFormat } from '../shared/loginDataFormat';
import { DATA } from '../shared/loginData';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Restangular } from 'ngx-restangular';
// import { HttpParams } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':['application/json'],
      'Authorization': 'my-auth-token',
      // 'Access-Control-Request-Headers': ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
      
    })
  };
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private restangular: Restangular) { }
  // getData() :Observable<dataFormat[]>{
  //   // return of(DATA).pipe(delay(2000));
  //   // return of(DATA);
  //   return this.http.get<dataFormat[]> (baseURL + 'no_of_matches')

  //   .pipe(catchError(this.processHTTPMsgService.handleError));
  // }

  // getData( user) {
  //   let promise = new Promise((resolve, reject) => {
  //     let apiURL = baseURL + 'data';
  //     this.http.get(apiURL,user)
  //       .toPromise()
  //       .then(
  //         res => { // Success
  //           // resolve(res);
  //           // setTimeout(() => resolve(res), 2000);
  //           resolve(res)
  //         },
  //         msg => { // Error
  //           reject(msg);
  //         }
  //       );
  //   });
  //   return promise;
  // }
  getData( user) {
    let content ;
   
      let apiURL = baseURL + 'data';
      return  fetch(apiURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token'
        },
        body: JSON.stringify(user)
      });
    debugger;
   
  }
  // sendData(newUser) {  
  //   let promise = new Promise((resolve, reject) => {
  //     let apiURL = baseURL + 'signup';
  //     let user =JSON.stringify(newUser)
  //     // this.httpOptions.headers["user"]
  //     console.log(this.httpOptions);
  //     debugger;
  //     this.http.post(apiURL,[newUser.email,newUser.password] , this.httpOptions)
  //       .toPromise()
  //       .then(
  //         res => { // Success
  //           // resolve(res);
  //           setTimeout(() => resolve(res), 2000);
  //         },
  //         msg => { // Error
  //           reject(msg);
  //         }
  //       );
  //   });
  //   return promise
  // }

  sendData(newuser) {
    let content;
    //  console.log("inside sendData Service method :" + newuser)
    let apiURL = baseURL + 'signup';
    return fetch(apiURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      },
      body: JSON.stringify(newuser)
    });
    // debugger;
  }

  // sendData(newUser) :Observable<dataFormat[]>{
  //   console.log(newUser)
  //   let apiURL = baseURL + 'signup';
  //   return this.http.post<dataFormat[]>(apiURL, newUser)  
  // }
}