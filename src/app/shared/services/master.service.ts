import { Injectable, Input } from '@angular/core';
import { HttpService } from './http.service';
import { SnackbarService } from './snackbar.service';
import { Location } from '@angular/common';
import {AbstractControl} from "@angular/forms";
// import { NgControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})

export class MasterService {
  // @Input() set disableControl( condition : boolean ) {
  //   const action = condition ? 'disable' : 'enable';
  //   this.ngControl.control[action]();
  // }
  constructor(
    private httpService: HttpService,
    private snackBar: SnackbarService,
    private location: Location,
    // private ngControl : NgControl
  ) { }

  list_data: any[] = [];

  getRoleList() {
    return this.httpService.get('rolelist');
  }
  getCategoryList(){
    return this.httpService.get('categorylist');
  }
  
  onAddButton(actionValue: String, data: any, url: any) {
    if (actionValue === 'add') {
      try {
        this.httpService.post(url, data).subscribe((res: any) => {
          // this.showLoading = false;
          if (res.success) {
            this.snackBar.openSnackBar(res.message, 'Close', 'green-snackbar')
            this.location.back();
          }
          else {
            this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
          }
        },
          (err: any) => {
            //   this.showLoading = false;
            this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
          }

        );
      }
      catch (e) {
        //   this.showLoading = false;
        this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
      }
    } else {
      try {
        this.httpService
          .put(url, data)
          .subscribe((res: any) => {
            //   this.showLoading = false;
            if (res.success) {
              this.snackBar.openSnackBar(res.message, 'Close', 'green-snackbar')
              this.location.back();
            }
            else {
              this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
            }
          },
            (err: any) => {
              // this.showLoading = false;
              this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
            }
          );
      }
      catch (e) {
        //   this.showLoading = false;
        this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
      }
    }
  }
  whiteSpaces:string;
  whiteSpace(remark){
  this.whiteSpaces=remark.trim()
    if(this.whiteSpaces.length > 0){
      return true
    }
    return false
  }
  // numberValidator(){
  //   static numeric(control: AbstractControl) {
  //     let val = control.value;
  
  //     if (val === null || val === '') return null;
  
  //     if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };
  
  //     return null;
  //   }
  isNumberKey(evt)
  {
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if (charCode != 46 && charCode > 31 
       && (charCode < 48 || charCode > 57))
        return false;

     return true;
  }
  // }

}