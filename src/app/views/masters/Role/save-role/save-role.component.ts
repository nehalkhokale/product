import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../../../../shared/services/http.service';

export interface Role {
  _id: number;
  name: string;
  description: string;
  createdAt:Date;
  updattedAt:Date;
  updatedBy:any;
  createdBy:any;
  remarks:any;
  isActive: boolean;
}
const ELEMENT_DATA: Role[] = [];
@Component({
  selector: 'app-save-role',
  templateUrl: './save-role.component.html',
  styleUrls: ['./save-role.component.scss']
})
export class SaveRoleComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  roleObj: any = {
  name: ' ',
  description: '', 
  remarks:{},
  };
  roleId: Number;
  actionValue: String;
  roleForm: FormGroup;
  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.router.params.subscribe(params => {
      this.roleId = params['Id'];
      this.actionValue = params['action'];
      if (this.actionValue === "edit") {
        this.getUser();
      }
    });
  }
  initializeForm() {
    this.roleForm = new FormGroup({
      name: new FormControl('', Validators.required),      
      description: new FormControl(''),
    });
  }
 
  onSave() {
    let data = this.roleForm.value;
    
    if (this.actionValue === 'add') {
      this.httpService.post("createrole", data).subscribe((res: any) => {
        if (res.success) {
          this.location.back();
        }
      });
    } else {
      this.httpService
        .put(`updaterole/${this.roleId}`, data)
        .subscribe((res: any) => {
          if (res.success) {
            this.location.back();
          }
        });
    }
  }
  getUser(){
    console.log('roleId',this.roleId);
    
    this.httpService.get(`rolebyid/${this.roleId}`).subscribe((res:any)=>{
      this.roleObj = res.data
      console.log('res.data',res.data);
      
      this.roleForm = new FormGroup({
        name: new FormControl(this.roleObj.name, Validators.required),      
        description: new FormControl(this.roleObj.description),
      });
    })
  }

}
