import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Location } from '@angular/common';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { Expense } from '../../../shared/models/expense.model'
import { Category } from '../../../shared/models/category.model';
import { MasterService } from '../../../shared/services/master.service'
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import {ExpenseService} from '../../../shared/services/expense.service'

const ELEMENT_DATA: Expense[] = [];

@Component({
  selector: 'app-save-expense',
  templateUrl: './save-expense.component.html',
  styleUrls: ['./save-expense.component.scss']
})
export class SaveExpenseComponent implements OnInit {
  list_category: Category[] = [];
  date:FormControl
  constructor(private httpService: HttpService, private snackBar: SnackbarService
    , private location: Location, private masterService: MasterService , private router: Router , private expenseService:ExpenseService) { }

  ngOnInit() {
    this.getCategory()
    this.date= new FormControl('', Validators.required)
  }
  getCategory() {
    this.masterService.getCategoryList().subscribe((res: any) => {
      console.log('res in expense', res.date=this.date.value);
      

      this.list_category = res.data;
    }, (err: any) => {
      this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
    });
  }
  addSubcategory(categoryId:Number){
    let data ={
      date:this.date.value,
    category:categoryId,
    }
    console.log('--in comp data ',data);
    
    this.expenseService.category(data)
    // this.router.navigate(['expense/addsubcategory',{action:'edit', Id:categoryId,date:this.date.value}])
    
  }
}



