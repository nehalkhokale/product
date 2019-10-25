import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpService } from '../../../../shared/services/http.service';

export interface Category {
  categoryName: string;
  subCategory: string;
}

const ELEMENT_DATA: Category[] = [];

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  displayedColumns: string[] = ['categoryName', 'subCategory', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    let data = [{
      categoryName: 'Clothes',
      subCategory: 'Jeans, Kurta'
    }];

    this.dataSource = new MatTableDataSource(data);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addCategory(){
    alert('Add category');
  }

  editCategory(){
    alert('Edit category');
  }

  deleteCategory(){
    alert('Delete category');
  }

}
