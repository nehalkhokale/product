import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

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
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  displayedColumns: string[] = ['userName', 'role', 'email', 'mobile', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  
  constructor(private httpService: HttpService , private router: Router) { }

  ngOnInit() {
   this.httpService.get('userlist').subscribe((res:any)=>{
     
     
    res.data.forEach((element:any) => {
      element.role = element.role.name
     });
     console.log('res',res.data);
     this.dataSource = new MatTableDataSource(res.data)
   })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser(){
    this.router.navigate(['save-user',{action:'add'}])
  }

  editUser(userId: Number){
    this.router.navigate(['save-user',{action:'edit', Id:userId}])    
  }

  deleteUser(){
    alert('Delete category');
  }
}
