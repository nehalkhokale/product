import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/services/snackbar.service'
import { MasterService } from '../../../../shared/services/master.service'
import { HttpService } from '../../../../shared/services/http.service';
import { Role } from '../../../../shared/models/role.model';
import { User } from '../../../../shared/models/user.model'
import { StorageService } from '../../../../shared/services/storage.service';
import { environment } from 'src/environments/environment';
import {ExpenseService} from 'src/app/shared/services/expense.service'
import { Observable } from 'rxjs';
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
  profileEvent$: Observable<boolean>;
  selectedFileDetail$:string;
  userId: Number;
  actionValue: String;
  userForm: FormGroup;
  numberValidator: boolean;
  profileUrl: any;
  isProfile: string = "false";
  profileValue: boolean = false;
  profileChangeEvent: boolean = false;
  constructor(
    
    private httpService: HttpService,
    private router: ActivatedRoute,
    private location: Location,
    private masterService: MasterService,
    private snackBar: SnackbarService,
    private http: HttpClient,
    private expenseService :ExpenseService
  ) {
  }

  ngOnInit() {
    this.expenseService.profileEvent$.subscribe((res)=>{
      this.profileEvent$ = res.profileEvent
      this.selectedFileDetail$=res.selectedFile
      // this.onUpload()
    })
    this.initializeForm();
    this.getRole();
    this.router.params.subscribe(params => {
      this.userId = params['Id'];
      this.actionValue = params['action'];
      this.isProfile = params['isProfile'];

      if (this.actionValue === "edit") {
        this.getUser();
        
      }

      if (this.isProfile == "true") {
        this.profileValue = true

      } else {
        this.profileValue = false
      }
    });
  }
  initializeForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      role: new FormControl('', Validators.required),

    });
  }
  selectedFile: File = null;
  mobileInputs: any = []
  showLoading: boolean = false;
  userInitials: string;
  isNumberKey(evt: any) {
    if (evt.keyCode != 46 && evt.keyCode > 31
      && (evt.keyCode < 48 || evt.keyCode > 57))
      return false;

    return true;
  }
  onSave() {
    console.log('--profileEvent$',this.profileEvent$);
    if ((this.userForm.valid && this.userForm.dirty)) {
      this.showLoading = true;
      let data = this.userForm.value;
      data.name = {
        firstName: data.firstName,
        lastName: data.lastName,
      }
      this.url = (this.actionValue === 'add') ? "createuser" : `updateuser/${this.userId}`
      this.masterService.onAddButton(this.actionValue, data, this.url)

    }
    if (this.profileEvent$) {
      this.onUpload()
    }

  }

  getRole() {
    this.masterService.getRoleList().subscribe((res: any) => {
      this.list_role = res.data;
    }, (err: any) => {
      this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
    });
  }

  validation_messages = this.httpService.validation_messages
  getUser() {
    try {
      this.httpService.get(`userbyid/${this.userId}`).subscribe((res: any) => {
        this.userObj = res.data
        this.expenseService.emitValueObject({
          userObj:this.userObj,
          pageIndicator:true
         })
        this.userForm = new FormGroup({
          firstName: new FormControl(this.userObj.name.firstName, Validators.required),
          lastName: new FormControl(this.userObj.name.lastName, Validators.required),
          gender: new FormControl(this.userObj.gender),
          email: new FormControl(this.userObj.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
          mobile: new FormControl(this.userObj.mobile, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
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
  onUpload() {
    const fd = new FormData()
    fd.append('userImage', this.selectedFileDetail$)
    this.httpService.post('image', fd).subscribe((res: any) => {
      this.location.back();
    })
  }
}
