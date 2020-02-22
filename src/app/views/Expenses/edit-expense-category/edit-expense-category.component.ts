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
    private router: Router,
    private location: Location ,
    // // private masterService: MasterService,
    private snackBar: SnackbarService
  ) { }

  editExpenseCategory: any;
  isModified: boolean= false;
  ngOnInit() {
    this.editExpenseCategory = this.data;    
  }

  onAmountChange(event:any){
    if(Number.isInteger(Number(event)) && event >0){
      event = 0
      this.isModified = true
    }else{
      this.isModified = false
    }
  }

  onPaymentModeChange(event:any){
    this.isModified = true
  }
  

  saveExpenseCategoryDetails(){
  try{
    this.httpService.put(`expense/editcatexpense/${this.editExpenseCategory._id}`,this.editExpenseCategory).subscribe((res:any)=>{
      
      if (res.success){
      this.snackBar.openSnackBar('updated Expense', 'Close', 'green-snackbar'); 
      this.dialogRef.close({accept:true});
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
