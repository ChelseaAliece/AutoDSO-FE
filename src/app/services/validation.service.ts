import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateRegister(user) {
    if (user.firstName === undefined || user.lastName === undefined ||
      user.email === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    let emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailFormat.test(email);
  }
}
