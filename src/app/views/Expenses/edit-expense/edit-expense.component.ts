import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Location } from '@angular/common';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Expense } from 'src/app/shared/models/expense.model'
import { Category } from 'src/app/shared/models/category.model';
import { MasterService } from 'src/app/shared/services/master.service'
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ExpenseService } from 'src/app/shared/services/expense.service'
import { MatDialog } from '@angular/material/dialog';
import { EditExpenseCategoryComponent } from '../edit-expense-category/edit-expense-category.component';
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
  ExpenseDetailsFormGroup: FormGroup;
  constructor(
    private httpService: HttpService,
    private snackBar: SnackbarService,
    private location: Location,
    private masterService: MasterService,
    private router: Router,
    private expenseService: ExpenseService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.ExpenseDetailsFormGroup =  new FormGroup({
        category: new FormControl('', Validators.required),
        subCatDetails: new FormControl('', Validators.required),
    })
      let startDate = new Date
      startDate.setMonth(startDate.getMonth() , 1);
      this.startDateControl = new FormControl(startDate);
      this.endDateControl = new FormControl(new Date);
      this.getExpense()
      console.log(' navigate');
      
  }

  editCategory(expenseDate: string, categoryObj: any,expenseID:number) {
    console.log('categoryId', expenseDate, categoryObj);
    const dialogRef = this.dialog.open(EditExpenseCategoryComponent, {
      width: '90%',
      data: { expenseDate: expenseDate, categoryObj: categoryObj ,_id:expenseID}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result.accept){
        this.ngOnInit()
      }
    });
    // this.router.navigate(['expense/editexpense',{action:'edit', expenseDate:expenseDate,categoryObj:categoryObj}])    
  }
  
  getExpense() {
    let data ={
      "startDate":this.startDateControl.value,
      "endDate":this.endDateControl.value
      }
    this.httpService.post('getreport',data).subscribe((res:any)=>{
      this.expenseList=res.data
      console.log('res in expense',this.expenseList);
      // this.closeDialog 
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



