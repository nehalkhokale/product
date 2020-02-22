import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Location } from '@angular/common';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Expense } from 'src/app/shared/models/expense.model'
import { Category } from 'src/app/shared/models/category.model';
import { MasterService } from 'src/app/shared/services/master.service'
import { Router ,ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ExpenseService } from 'src/app/shared/services/expense.service'
import { MatDialog } from '@angular/material/dialog';
import { EditExpenseCategoryComponent } from '../edit-expense-category/edit-expense-category.component';
const ELEMENT_DATA: Expense[] = [];

export class ExpenseCat{
  startDate:Date
  endDate:Date;
};

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent implements OnInit {
  list_category: Category[] = [];
  expenseList = [];
  startDateControl: FormControl;
  endDateControl: FormControl;
  ExpenseDetailsFormGroup: FormGroup;
  categoryName: string;
  actionValue: string;
  dateValue: Date;
  // expenseCat = new ExpenseCat();

  expenseCat = {
    startDate: null,
    endDate: null
  };

  constructor(
    private httpService: HttpService,
    private snackBar: SnackbarService,
    private location: Location,
    private masterService: MasterService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private expenseService: ExpenseService,
    public dialog: MatDialog) { }
    flag:string;
    year:number;
    month:number;
    
  ngOnInit() {
    this.ExpenseDetailsFormGroup =  new FormGroup({
      category: new FormControl('', Validators.required),
      subCatDetails: new FormControl('', Validators.required),
  })
  let startDate = new Date
        startDate.setMonth(startDate.getMonth() , 1);
        this.startDateControl = new FormControl(startDate);
        this.endDateControl = new FormControl(new Date);
    this.activatedRoute.params.subscribe(params => {
      // console.log('--params',params);
      if(params){
        // console.log('-- in if of params',params['dateValue']);
        
        this.categoryName = params['categoryName'];
        this.actionValue = params['action'];
        this.flag = params['flag'];
        this.dateValue = params['dateValue'];
        this.year = params['year'];
        this.month = params['month'];
        // console.log('--this.year',this.year ,this.month ,this.dateValue,this.flag,this.actionValue,this.categoryName);
        
        if(this.flag =='month'){
          // THE DATE OBJECT.
          // GET THE MONTH AND YEAR OF THE SELECTED DATE.
          var month =this.month,
          year =  this.year
          // GET THE FIRST AND LAST DATE OF THE MONTH.
          let FirstDay = new Date(year, month-1, 1 );
          let LastDay = new Date(year, month ,0);
          this.expenseCat.startDate = FirstDay
          this.expenseCat.endDate = LastDay
          // console.log('--end day and start day in Month',FirstDay,LastDay);

      }
      if(this.flag =='day'){
        
          this.expenseCat.startDate = new Date(this.dateValue)
          this.expenseCat.endDate = new Date(this.dateValue)
          // console.log('--end day and start day in Day',this.dateValue);

      }
      if(this.flag =='year'){
          // var year = year //Any Year
          
          // GET THE FIRST AND LAST DATE OF THE YEAR.
          let FirstDay = new Date(this.year, 0, 1);
          let LastDay = new Date(this.year, 11, 31);
          // console.log('--FirstDay',FirstDay,LastDay,this.year);
          
          this.expenseCat.startDate = FirstDay
          this.expenseCat.endDate = LastDay
          // console.log('--end day and start day in Year',this.dateValue);

      }
        // let startDate = new Date
        // startDate.setMonth(startDate.getMonth() , 1);
        this.startDateControl = new FormControl(this.expenseCat.startDate);
        this.endDateControl = new FormControl(this.expenseCat.endDate);

        this.getExpense()
      }else{
        let startDate = new Date
        startDate.setMonth(startDate.getMonth() , 1);
        this.startDateControl = new FormControl(startDate);
        this.endDateControl = new FormControl(new Date);
        this.getExpense()
      }
     
      
    });
   
      // let startDate = new Date
      // startDate.setMonth(startDate.getMonth() , 1);
      // this.startDateControl = new FormControl(startDate);
      // this.endDateControl = new FormControl(new Date);
      // this.getExpense()
      
  }

  editCategory(expenseDate: string, categoryObj: any,expenseID:number) {
    const dialogRef = this.dialog.open(EditExpenseCategoryComponent, {
      width: '90%',
      data: { expenseDate: expenseDate, categoryObj: categoryObj ,_id:expenseID}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.accept){
        this.ngOnInit()
      }
    });
  }
  
  getExpense() {
    try{
      let data ={
        "startDate":(this.actionValue=='categoryFilter') ?  this.expenseCat.startDate : this.startDateControl.value,
        "endDate":(this.actionValue=='categoryFilter') ?  this.expenseCat.endDate : this.endDateControl.value,
        "categoryName":(this.actionValue=='categoryFilter') ?  this.categoryName : null
        }

      this.httpService.post('getreport',data).subscribe((res:any)=>{
        this.expenseList=res.data
      }, (err: any) => {
        this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
      });
    }catch(e){
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }
    
  }
  
}



