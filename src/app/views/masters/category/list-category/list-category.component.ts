import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpService } from '../../../../shared/services/http.service';
import { Router } from '@angular/router';

export interface Category {
  _id:Number;
  category: string;
  subCategory: string;
  isActive:boolean;
  createdAt:Date;
  updattedAt:Date;
  updatedBy:any;
  createdBy:any;
  remarks:any;
}

const ELEMENT_DATA: Category[] = [];

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  displayedColumns: string[] = ['Category', 'Subcategory', 'Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private httpService: HttpService , private router: Router) { }

  ngOnInit() {
   this.httpService.get('categorylist').subscribe((res:any)=>{
     
     
    res.data.forEach((element:any) => {
       let subCategoryArray : string[]= [];
       element.subCategory.forEach((subCategoryName,index)=>{
         subCategoryArray.push(subCategoryName.name)
       })
       element.subCategory = subCategoryArray
     });
     console.log('res',res.data);
     this.dataSource = new MatTableDataSource(res.data)
   })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addCategory(){
    this.router.navigate(['save-category',{action:'add'}])
  }

  editCategory(categoryId: Number){
    this.router.navigate(['save-category',{action:'edit', Id:categoryId}])    
  }

  deleteCategory(){
    alert('Delete category');
  }

}
