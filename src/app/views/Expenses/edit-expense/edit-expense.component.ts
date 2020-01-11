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
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent implements OnInit {
  list_category: Category[] = [];
  expenseList =[];
  startDateControl:FormControl;
  endDateControl:FormControl;
  ExpenseDetailsFormGroup: FormGroup
  


  constructor(private httpService: HttpService, private snackBar: SnackbarService
    , private location: Location, private masterService: MasterService , private router: Router , private expenseService:ExpenseService) { }

  ngOnInit() {
    this.ExpenseDetailsFormGroup =  new FormGroup({
        category: new FormControl('', Validators.required),
        subCatDetails: new FormControl('', Validators.required),
    })
      let startDate = new Date
      startDate.setMonth(startDate.getMonth() , 1);
      this.startDateControl = new FormControl(startDate);
      this.endDateControl = new FormControl(new Date);
      this.getExpense(this.startDateControl.value,  this.endDateControl.value)

  }
  getExpense(startDate,endDate) {
    let data ={
      "startDate":startDate,
      "endDate":endDate
      }
    this.httpService.post('getreport',data).subscribe((res:any)=>{
      this.expenseList=res.data
      console.log('res in expense',this.expenseList);
      // this.list_category = res.data;
    //   res.data.forEach((element,i) => {
    //     element.ExpenseDetails.forEach((category,j) => {
    //       console.log('---category',category);
    //       category.forEach((subcat,k) => {
    //         console.log('--subcat',subcat);
            
    //       });
    //     });
    //   });
    //   this.ExpenseDetailsFormGroup =  new FormGroup({
    //     category: new FormControl('', Validators.required),
    //     subCatDetails: new FormControl('', Validators.required),
    // })
    }, (err: any) => {
      this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
    });
  }
  
}



