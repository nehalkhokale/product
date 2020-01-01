import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl: String = 'http://localhost:1000/balancesheet/'; // Localhost

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(this.baseUrl + url);
  }

  post(url: string, data: any) {
    return this.http.post(this.baseUrl + url, data);
  }

  put(url: string, data: any) {
    return this.http.put(this.baseUrl + url, data);
  }

  delete(url: string) {
    return this.http.delete(this.baseUrl + url);
  }

  getBaseURL(){
    return this.baseUrl;
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'firstName': [
      { type: 'required', message: 'First name is required' },     
    ],
    'lastName': [
      { type: 'required', message: 'Last name is required' },     
    ],
    'gender': [
      { type: 'required', message: 'Gender is required' },     
    ],
    'mobile': [
      { type: 'required', message: 'Mobile is required' },     
    ],
    'role': [
      { type: 'required', message: 'Role is required' },     
    ]

  }
 
}
