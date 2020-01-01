import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpService } from '../../../../shared/services/http.service';
import { Router } from '@angular/router';
import {SnackbarService} from '../../../../shared/services/snackbar.service';
import {DialogserviceComponent} from '../../../../shared/components/dialogservice/dialogservice.component';
import{MatDialog} from '@angular/material/dialog';
import{Category} from '../../../../shared/models/category.model';

const ELEMENT_DATA: Category[] = [];

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  dialogData : {}
  displayedColumns: string[] = ['position','Category', 'Subcategory', 'Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private httpService: HttpService , private router: Router, private snackBar: SnackbarService, public MatDialog : MatDialog) { }

  ngOnInit() {
    
    try{
   this.httpService.get('categorylist').subscribe((res:any)=>{
     
     if (res.success){
       res.data.forEach((element:any) => {
       let subCategoryArray : string[]= [];
       element.subCategory.forEach((subCategoryName,index)=>{
         subCategoryArray.push(subCategoryName.name)
       })
       element.subCategory = subCategoryArray
     });
     console.log('res',res.data);
     this.dataSource = new MatTableDataSource(res.data)
    }
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

  addCategory(){
    this.router.navigate(['category/save-category',{action:'add'}])
  }

  editCategory(categoryId: Number){
    this.router.navigate(['category/save-category',{action:'edit', Id:categoryId}])    
  }
  
  deleteCategory(categoryId:Number){
    this.httpService.get(`categorybyid/${categoryId}`).subscribe((res:any)=>{
      this.dialogData = {
        dialogHeader : categoryId + "category",
        dialogMessage : "",
        dialogAcceptBtn : "Yes",
        dialogRejecteBtn : "No",
        dailogTerm : res.data.category + ' '+ 'category',
        dailogRoute:'list-category',
       
     }
    
      let dailogBox = this.MatDialog.open(DialogserviceComponent, {
        data: this.dialogData
      });
      dailogBox.afterClosed().subscribe(value => {
        let remarks = value.remarks
        if(value.accept){
          this.httpService.put(`deletecategory/${categoryId}`,remarks).subscribe((res:any)=>{
            console.log('after deleting res',res);
            this.ngOnInit()
          })
        }
        
      })
    })
    
    // alert('Delete category');
  }

}
