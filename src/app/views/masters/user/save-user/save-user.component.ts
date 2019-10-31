import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../../../../shared/services/http.service';
import { StorageService } from '../../../../shared/services/storage.service';

export interface User {
  _id: number;
  name: any;
  gender: string;
  email: string;
  role: string;
  createdAt:Date;
  updattedAt:Date;
  updatedBy:any;
  createdBy:any;
  remarks:any;
  mobile: string;
  isActive: boolean;
}
const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  userObj: any = {
  name: {},
  gender: ' ',
  email: '',
  role: '',  
  remarks:{},
  mobile: '',
  };
  userId: Number;
  actionValue: String;
  userForm: FormGroup;
  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.router.params.subscribe(params => {
      this.userId = params['Id'];
      this.actionValue = params['action'];
      if (this.actionValue === "edit") {
        this.getUser();
      }
    });
  }
  initializeForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),      
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),

    });
  }
 
  onSave() {
    let data = this.userForm.value;
    data.name={
      firstName:data.firstName,
      lastName:data.lastName,
    }
    if (this.actionValue === 'add') {
      this.httpService.post("createuser", data).subscribe((res: any) => {
        if (res.success) {
          this.location.back();
        }
      });
    } else {
      this.httpService
        .put(`updateuser/${this.userId}`, data)
        .subscribe((res: any) => {
          if (res.success) {
            this.location.back();
          }
        });
    }
  }
  getUser(){
    console.log('userId',this.userId);
    
    this.httpService.get(`userbyid/${this.userId}`).subscribe((res:any)=>{
      this.userObj = res.data
      console.log('res.data',res.data);
      
      this.userForm = new FormGroup({
        firstName: new FormControl(this.userObj.name.firstName, Validators.required),      
      lastName: new FormControl(this.userObj.name.lastName, Validators.required),
      gender: new FormControl(this.userObj.gender),
      email: new FormControl(this.userObj.email, Validators.required),
      mobile: new FormControl(this.userObj.mobile, Validators.required),
      role: new FormControl(this.userObj.role.name, Validators.required),
      });
    })
  }

}
