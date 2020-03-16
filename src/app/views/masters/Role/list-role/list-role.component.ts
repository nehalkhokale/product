import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {SnackbarService} from '../../../../shared/services/snackbar.service'
import { Router } from '@angular/router';
import { HttpService } from '../../../../shared/services/http.service';
import {DialogserviceComponent} from '../../../../shared/components/dialogservice/dialogservice.component';
import{MatDialog} from '@angular/material/dialog';
import{Role} from '../../../../shared/models/role.model'

const ELEMENT_DATA: Role[] = [];
@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {
  dialogData: any
  
  displayedColumns: string[] = ['Sr.No', 'role', 'description', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  
  constructor(private httpService: HttpService , private router: Router, private snackBar:SnackbarService , private MatDialog :MatDialog) { }

  ngOnInit() {
    try{
   this.httpService.get('rolelist').subscribe((res:any)=>{
     this.dataSource = new MatTableDataSource(res.data)
   },
   (err:any)=>{
     this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
   } 
   )}
   catch(e){
     this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
   }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addRole(){
    this.router.navigate(['role/save-role',{action:'add'}])
  }

  editRole(userId: Number){
    this.router.navigate(['role/save-role',{action:'edit', Id:userId}])    
  }

  deleteRole(userId:Number){
    this.httpService.get(`rolebyid/${userId}`).subscribe((res:any)=>{
      // console.log('user res',res);
      
      this.dialogData = {
        dialogHeader : userId + "role",
        dialogMessage : "",
        dialogAcceptBtn : "Yes",
        dialogRejecteBtn : "No",
        dailogTerm : res.data.name + ' '+ 'role',
        dailogRoute:'list-role'
     }
    
      let dailogBox = this.MatDialog.open(DialogserviceComponent, {
        data: this.dialogData
      });
      dailogBox.afterClosed().subscribe(value => {
        if(value && value.accept){
          let remarks = value.remarks
          this.httpService.put(`deleterole/${userId}`,remarks).subscribe((res:any)=>{
            // console.log('after deleting res',res);
            this.ngOnInit()
          })
        }
        
      })
    })
  }
}
