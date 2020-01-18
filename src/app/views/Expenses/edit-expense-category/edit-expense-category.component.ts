import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from "src/app/shared/services/http.service";
import { SnackbarService } from 'src/app/shared/services/snackbar.service'
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-expense-category',
  templateUrl: './edit-expense-category.component.html',
  styleUrls: ['./edit-expense-category.component.scss']
})
export class EditExpenseCategoryComponent implements OnInit {
  expenseId: Number;
  categoryId:Number;
  actionValue: String;
  paymentModes : string[] = ['Check','Cash','Debit card','Credit card','Paytm','Googlepay','Phonepay'];

  constructor(
    public dialogRef: MatDialogRef<EditExpenseCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private router: ActivatedRoute,
    // private location: Location ,
    // // private masterService: MasterService,
    private snackBar: SnackbarService
  ) { }

  editExpenseCategory: any;
  isModified: boolean= false;
  ngOnInit() {
    this.editExpenseCategory = this.data;
    console.log(' in dailog ',this.data);
    
  }

  onAmountChange(event:any){

    console.log(' event any in amount ',Number(event),typeof(Number(event)),Number.isInteger(event) , event > 0);
    if(Number.isInteger(Number(event)) && event >0){
      console.log(' in true');
      event = 0
      this.isModified = true
    }else{
      console.log(' in false');

      this.isModified = false
    }
  }

  onPaymentModeChange(event:any){
    console.log(' event any payment ',event);
    this.isModified = true
  }
  // editExpenseCategoryForm: FormGroup;
  // initializeForm() {
  //   this.editExpenseCategoryForm = new FormGroup({
  //     Ca: new FormControl('', Validators.required)
  //   });
  // }
  // getExpense(){
  //   console.log('categoryId',this.expenseId);
  //   let data={categoryId:this.categoryId}
  //   try{
  //   this.httpService.put(`expense/getexpensebyid/${this.expenseId}`,data).subscribe((res:any)=>{
  //     console.log('---in edit esense',res);
      
  //   },
  //   (err:any)=>{
  //     this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
  //   } 
  //   )}
  //   catch(e){
  //     this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
  //   }
  // }

  saveExpenseCategoryDetails(){
    // console.log('--on save ',this.editExpenseCategory===this.originalExpenseCategory);

  try{
    
    this.httpService.put(`expense/editcatexpense/${this.editExpenseCategory._id}`,this.editExpenseCategory).subscribe((res:any)=>{
      
      if (res.success){
      this.snackBar.openSnackBar('updated Expense', 'Close', 'green-snackbar');
      // this.dataSource = new MatTableDataSource(res.data)
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
}
