import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../../../../shared/services/http.service';
import { StorageService } from '../../../../shared/services/storage.service';

export class User {
  _id: number;
  firstName: string;
  lastName: string;
  password: string;
  role: any;
  email: string;
  mobile: string;
  isActive: boolean;
}

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent implements OnInit {

  userForm: FormGroup;
  userId: number;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) { }

  ngOnInit() {
    this.resetUserObject();
    this.bindUserData();
    this.route.params.subscribe(params => {
       this.userId = +params['_id']; // (+) converts string 'id' to a number

       this.getUserById();
    });
  }

  objUser: any;
  resetUserObject(){
    try{
      this.objUser = new User();
      console.log('this.objUser', this.objUser);
    }catch(e){

    }
  }

  bindUserData(){
    try{
      this.userForm = this.formBuilder.group({
        _id: [this.objUser._id, Validators.required],
        firstName: [this.objUser.firstName],
        lastName: [this.objUser.lastName],
        password: [this.objUser.password],
        email: [this.objUser.email],
        mobile: [this.objUser.mobile],
        role: [this.objUser.role],
        isActive: [this.objUser.active, Validators.required]
      });
    }catch(e){

    }
  }

  getUserById(){
    this.objUser = this.storageService.getUserById(this.userId);
    this.bindUserData();
  }

}
