import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../../../../shared/services/http.service';
export interface Role {
  _id: number;
  name: String;
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
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {

  
  displayedColumns: string[] = ['Sr.No', 'role', 'description', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  
  constructor(private httpService: HttpService , private router: Router) { }

  ngOnInit() {
   this.httpService.get('rolelist').subscribe((res:any)=>{
     this.dataSource = new MatTableDataSource(res.data)
   })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addRole(){
    this.router.navigate(['save-role',{action:'add'}])
  }

  editRole(userId: Number){
    this.router.navigate(['save-role',{action:'edit', Id:userId}])    
  }

  deleteRole(){
    alert('Delete category');
  }
}
