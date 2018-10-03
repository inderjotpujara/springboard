import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseURL';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() { }

  getRoomStatus( roomName) {
      let apiURL = baseURL + 'roomstatus';
      return  fetch(apiURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token'
        },
        body:JSON.stringify(roomName)
      });
    debugger;
  }

  bookRoom( roomInfo) {
      let apiURL = baseURL + 'bookroom';
      return  fetch(apiURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token'
        },
        body:JSON.stringify(roomInfo)
      });
    debugger;
  }

  roomAvailability( info) {
      let apiURL = baseURL + 'availability';
      return  fetch(apiURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token'
        },
        body:JSON.stringify(info)
      });
    debugger;
  }
}
