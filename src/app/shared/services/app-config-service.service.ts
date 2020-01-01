import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigServiceService {

  constructor() { }

  clearSession(){
    sessionStorage.clear();
  }
}
