import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { SnackbarService } from '../../../../shared/services/snackbar.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {  Router, ActivatedRoute } from '@angular/router';
import { Role } from '../../../../shared/models/role.model';
import { HttpService } from '../../../../shared/services/http.service';
import { MatTable } from '@angular/material';
import { RoleModule } from '../role.module';
import { MasterService } from '../../../../shared/services/master.service'

@Component({
  selector: 'app-save-role',
  templateUrl: './save-role.component.html',
  styleUrls: ['./save-role.component.scss']
})
export class SaveRoleComponent implements OnInit {

  roleObj: any = {
    name: ' ',
    description: '',
    remarks: {},
  };
  roleId: Number;
  actionValue: String;
  roleForm: FormGroup;
  url:any;
  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
    private location: Location,
    private masterService: MasterService,
    private snackBar: SnackbarService
  ) { }

  ngOnInit() {
    this.resetRoleObj();
    this.buildForm();
    this.router.params.subscribe(params => {
      this.roleId = params['Id'];
      this.actionValue = params['action'];
      if (this.actionValue === "edit") {
        this.getRole();
      }
    });
  }

  resetRoleObj() {
    this.roleObj = new Role();
  }

  buildForm() {
    this.roleForm = new FormGroup({
      name: new FormControl(this.roleObj.name, Validators.required),
      description: new FormControl(this.roleObj.description),
    });
  }

  getRole() {
    try {
      console.log('roleId', this.roleId);
      this.httpService.get(`rolebyid/${this.roleId}`).subscribe((res: any) => {
        this.roleObj = res.data;
        this.buildForm();
      },
        (err: any) => {
          this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
        }
      )
    }catch(e){
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }
  }

  onSave() {
    try {
      let data = this.roleForm.value;
      this.url =(this.actionValue === 'add')?"createrole" :`updaterole/${this.roleId}`
      this.masterService.onAddButton(this.actionValue,data,this.url)
      // if (this.actionValue === 'add') {

      //   this.httpService.post("createrole", data).subscribe((res: any) => {
      //     if (res.success) {
      //       this.snackBar.openSnackBar(res.message, 'Close', 'green-snackbar')
      //       this.location.back();
      //     } else {
      //       this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
      //     }
      //   }, (err: any) => {
      //     this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
      //   });
      // } else {

      //   this.httpService.put(`updaterole/${this.roleId}`, data).subscribe((res: any) => {
      //     console.log('res', res);

      //     if (res.success) {
      //       this.snackBar.openSnackBar(res.message, 'Close', 'green-snackbar')
      //       this.location.back();
      //     }
      //     else {
      //       this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
      //     }
      //   }, (err: any) => {
      //     this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
      //   });
      // }
    } catch (e) {
      this.snackBar.openSnackBar(e.message, 'Close', 'red-snackbar');
    }
  }

}
