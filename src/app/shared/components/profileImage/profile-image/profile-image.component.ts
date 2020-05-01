import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../../../shared/services/http.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service'
import {  ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ExpenseService} from 'src/app/shared/services/expense.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private snackBar: SnackbarService,
    private router: ActivatedRoute,
    private location: Location,
    private expenseService :ExpenseService
  ) { 
    
   }
  pageIndicator:boolean;
  userDetail:any;
  userId: Number;
  profileChangeEvent: boolean = false;
  message: string = '';
  profileUrl: any;
  selectedFile: File = null;
  userInitials: string;
  userObj: any = {
    name: {},
    gender: ' ',
    email: '',
    role: '',
    remarks: {},
    mobile: '',
  };
  ngOnInit() {
    console.log('--component');
    this.expenseService.loginValueEmitter$.subscribe((res)=>{
      this.expenseService.userObj$.subscribe((res)=>{
        console.log('--in comt observe--------',res,res.pageIndicator );
        this.userDetail = res.userObj
        this.pageIndicator= res.pageIndicator
        this.getUser();
      })
    })
    console.log('--this.userDetail$--',this.userDetail);
    
    this.router.params.subscribe(params => {
      this.userId = params['Id'];
    })
  }
  updateImage(){
    this.expenseService.emitValue({
      profileEvent:true,
      selectedFile:this.selectedFile,
      userObj:this.userObj
    })
  }
  onFileSelection(event) {
    this.profileChangeEvent = true
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.profileUrl = reader.result;
    }
    this.selectedFile = event.target.files[0]
    this.updateImage()
  }
  getUser() {
    try {
        this.userObj = this.userDetail
        console.log('-- get one user comp', this.userObj,this.userDetail);
        if (this.userObj.image) {
          this.profileUrl = environment.baseUrlProfile + this.userObj.image.slice(8, this.userObj.image.length)
        } else {
          this.userInitials = this.userObj.name.firstName.slice(0, 1) + this.userObj.name.lastName.slice(0, 1)
        }
        console.log('--this.profileUrl', this.profileUrl, this.userInitials,this.pageIndicator);
    }
    catch (e) {
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }
  }
}
