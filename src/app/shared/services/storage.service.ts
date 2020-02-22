import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  data: any[] = [{
    _id: 1,
    firstName: 'Nehal',
    lastName: 'Khokale',
    role: { _id: 1, name: 'Admin' },
    email: 'nehal.khokale@gmail.com',
    mobile: '9999999999',
    password: '',
    isActive: true
  }, {
    _id: 2,
    firstName: 'Satyajeet',
    lastName: 'Thakare',
    role: { _id: 1, name: 'Non-Admin' },
    email: 'satyajeet.thakare@gmail.com',
    mobile: '8888888888',
    password: '',
    isActive: true
  }];

  constructor() { }

  getUserList() {
    return this.data;
  }

  getUserById(_id: number) {
    let objUser = this.data.find(ele => ele._id == _id);
    return objUser;
  }
}
