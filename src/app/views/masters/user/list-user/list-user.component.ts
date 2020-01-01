import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../../../shared/services/http.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { DialogserviceComponent } from '../../../../shared/components/dialogservice/dialogservice.component';
import{User} from '../../../../shared/models/user.model'


const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  
  dialogData: any
  displayedColumns: string[] = ['userName', 'role', 'email', 'gender', 'mobile', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private httpService: HttpService, private router: Router, private MatDialog: MatDialog) { }

  ngOnInit() {
    this.httpService.get('userlist').subscribe((res: any) => {

      res.data.forEach((element: any) => {
        element.role = element.role.name
      });
      console.log('res', res.data);
      this.dataSource = new MatTableDataSource(res.data)
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    this.router.navigate(['user/save-user', { action: 'add' }])
  }

  editUser(ele: User) {
    this.router.navigate(['user/save-user', { action: 'edit', Id: ele._id }])
  }

  deleteUser(ele: User) {
    
    this.dialogData = {
      dialogHeader: "Delete category",
      dialogMessage: "",
      dialogAcceptBtn: "Yes",
      dialogRejecteBtn: "No",
      dailogTerm: ele.name.firstName + ' ' + ele.name.lastName + ' ' + 'user',
      dailogRoute: 'user/list-user'
    }

    let dailogBox = this.MatDialog.open(DialogserviceComponent, {
      data: this.dialogData
    });

    dailogBox.afterClosed().subscribe(value => {
      let remarks = value.remarks;
      console.log('--value', value);
      if (value.accept) {
        this.httpService.put(`deleteuser/${ele._id}`, remarks).subscribe((res: any) => {
          this.ngOnInit()
        })
      }
    })
  }
}