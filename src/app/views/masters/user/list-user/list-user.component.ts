import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { HttpService } from '../../../../shared/services/http.service';
import { StorageService } from '../../../../shared/services/storage.service';

export interface User {
  _id: number;
  firstName: string;
  lastName: string;
  password: string;
  role: any;
  email: string;
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

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    let data = this.storageService.getUserList();
    this.dataSource = new MatTableDataSource(data);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser(){
    this.router.navigate(['save-user', {profile_type: 'create'}]);
  }

  editUser(obj: User){
    this.router.navigate(['/save-user', {_id: obj._id, profile_type: 'edit'}]);
  }

  deleteUser(){
    alert('Delete user');
  }
}
