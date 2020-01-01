import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/services/snackbar.service'
import { MasterService } from '../../../../shared/services/master.service'
import { HttpService } from '../../../../shared/services/http.service';
import { Role } from '../../../../shared/models/role.model';
import{User} from '../../../../shared/models/user.model'
import { StorageService } from '../../../../shared/services/storage.service';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent implements OnInit {
  list_role: Role[] = [];
  url: any;
  userObj: any = {
    name: {},
    gender: ' ',
    email: '',
    role: '',
    remarks: {},
    mobile: '',
  };
  userId: Number;
  actionValue: String;
  userForm: FormGroup;
  numberValidator:boolean;
  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
    private location: Location,
    private masterService: MasterService,
    private snackBar: SnackbarService
  ) { }

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
      gender: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      mobile: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{10}$')]),
      role: new FormControl('', Validators.required),

    });
  }
  
  mobileInputs:any=[]
  showLoading: boolean = false;
  isNumberKey(evt:any)
  {
    //  var charCode = (evt.which) ? evt.which : evt.keyCode;
    //  console.log('here bhai');
     
     if (evt.keyCode != 46 && evt.keyCode > 31 
       && (evt.keyCode < 48 || evt.keyCode > 57))
        return false;

     return true;
  }
  onSave() {
    this.showLoading = true;
    let data = this.userForm.value;
    data.name = {
      firstName: data.firstName,
      lastName: data.lastName,
    }
    this.url =(this.actionValue === 'add')?"createuser" :`updateuser/${this.userId}`
    console.log('role', data);
   
    this.masterService.onAddButton(this.actionValue,data,this.url)
    // if (this.actionValue === 'add') {
    //   try {
    //     this.httpService.post("createuser", data).subscribe((res: any) => {
    //       this.showLoading = false;
    //       if (res.success) {
    //         this.snackBar.openSnackBar(res.message, 'Close', 'green-snackbar')
    //         this.location.back();
    //       }
    //       else {
    //         this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
    //       }
    //     },
    //       (err: any) => {
    //         this.showLoading = false;
    //         this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
    //       }

    //     );
    //   }
    //   catch (e) {
    //     this.showLoading = false;
    //     this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    //   }
    // } else {
    //   try {
    //     this.httpService
    //       .put(`updateuser/${this.userId}`, data)
    //       .subscribe((res: any) => {
    //         this.showLoading = false;
    //         if (res.success) {
    //           this.snackBar.openSnackBar(res.message, 'Close', 'green-snackbar')
    //           this.location.back();
    //         }
    //         else {
    //           this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
    //         }
    //       },
    //         (err: any) => {
    //           this.showLoading = false;
    //           this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
    //         }
    //       );
    //   }
    //   catch (e) {
    //     this.showLoading = false;
    //     this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    //   }
    // }
  }

  getRole(){
    this.masterService.getRoleList().subscribe((res: any) => {
      this.list_role = res.data;
    }, (err: any) => {
      this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
    });
  }

  validation_messages = this.httpService.validation_messages
  getUser() {
    console.log('userId', this.userId);
    try {
      this.httpService.get(`userbyid/${this.userId}`).subscribe((res: any) => {
        this.userObj = res.data
        console.log('---get gender', res.data, this.userObj.gender);

        this.userForm = new FormGroup({
          firstName: new FormControl(this.userObj.name.firstName, Validators.required),
          lastName: new FormControl(this.userObj.name.lastName, Validators.required),
          gender: new FormControl(this.userObj.gender),
          email: new FormControl(this.userObj.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
          mobile: new FormControl(this.userObj.mobile,[Validators.required,Validators.pattern('^[0-9]{10}$')]),
          role: new FormControl(this.userObj.role, Validators.required),
        });
      },
        (err: any) => {
          this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
        }
      )
    }
    catch (e) {
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }
  }
 
}
