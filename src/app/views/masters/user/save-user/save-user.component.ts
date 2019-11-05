import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import {SnackbarService} from '../../../../shared/services/snackbar.service'
import { HttpService } from '../../../../shared/services/http.service';
import {Role} from '../../../../shared/models/role.model';
import { StorageService } from '../../../../shared/services/storage.service';

export interface User {
  _id: number;
  name: any;
  gender: string;
  email: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
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
  list_role: Role[] = [];
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
    private location: Location,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getRole();
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
    console.log('role',data);
    
    if (this.actionValue === 'add') {
      try{
      this.httpService.post("createuser", data).subscribe((res: any) => {
        if (res.success) {
          this.snackBar.openSnackBar(res.message, 'Close', 'success-snackbar')
          this.location.back();
        }
        else{
          this.snackBar.openSnackBar(res.message, 'Close', 'error-snackbar');
        }
      },
      (err:any)=>{
        this.snackBar.openSnackBar(err.error.message, 'Close', 'error-snackbar');
      }
      
      );}
      catch(e){
        this.snackBar.openSnackBar(e, 'Close', 'error-snackbar');
      }
    } else {
      try{
      this.httpService
        .put(`updateuser/${this.userId}`, data)
        .subscribe((res: any) => {
          if (res.success) {
            this.snackBar.openSnackBar(res.message, 'Close', 'success-snackbar')
            this.location.back();
          }
          else{
            this.snackBar.openSnackBar(res.message, 'Close', 'error-snackbar');
          }
        },
        (err:any)=>{
          this.snackBar.openSnackBar(err.error.message, 'Close', 'error-snackbar');
        }        
        );}
        catch(e){
          this.snackBar.openSnackBar(e, 'Close', 'error-snackbar');
        }
    }
  }
  getRole(){
    this.httpService.get('rolelist').subscribe((res:any)=>{
      this.list_role = res.data
    })
  }
  getUser(){
    console.log('userId',this.userId);
    try{
    this.httpService.get(`userbyid/${this.userId}`).subscribe((res:any)=>{
      this.userObj = res.data
      console.log('res.data',res.data);
      
      this.userForm = new FormGroup({
        firstName: new FormControl(this.userObj.name.firstName, Validators.required),      
      lastName: new FormControl(this.userObj.name.lastName, Validators.required),
      gender: new FormControl(this.userObj.gender),
      email: new FormControl(this.userObj.email, Validators.required),
      mobile: new FormControl(this.userObj.mobile, Validators.required),
      role: new FormControl(this.userObj.role, Validators.required),
      });
    },
    (err:any)=>{
      this.snackBar.openSnackBar(err.error.message, 'Close', 'error-snackbar');
    } 
    )}
    catch(e){
      this.snackBar.openSnackBar(e, 'Close', 'error-snackbar');
    }
  }

}
