import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Category } from '../../../shared/models/category.model';
import { MasterService } from '../../../shared/services/master.service'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../shared/services/http.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExpenseService } from '../../../shared/services/expense.service'
import { Expense } from '../../../shared/models/expense.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit, OnDestroy {
  initial:any;
  dateForm: FormControl;
  expenseId: Number;
  categoryArray: any = [];
  arrayIndex = 0;
  categoryId: Number;
  categoryObj: Expense[] = [];
  paymentModes : string[] = ['Check','Cash','Debit card','Credit card','Paytm','Googlepay','Phonepay'];
  arrayExpenseDetails: any;
  date: Date;
  actionValue: String;
  subcategory_list: Category[] = []
  dateSelection = new FormControl(new Date());
  // subcategory_list: any;
  category_list: any = []
  subCategoryForm: FormGroup;
  status: boolean;
  formSubCategory: FormGroup;
  panelOpenState = false;
  validation = false;
  counter: number = 0;
  public contactList: FormArray;
  constructor(private httpService: HttpService, private snackBar: SnackbarService, private expenseService: ExpenseService,
    private masterService: MasterService, private activatedRoute: ActivatedRoute
    , private fb: FormBuilder) {
    // this.form = this.fb.group({
    //   published: true,
    //   credentials: this.fb.array([]),
    // });
  }
  ngOnInit() {
    this.dateForm = new FormControl('' ,Validators.required)  
    this.expenseService.categoryDetails().subscribe((data) => {
    });
    this.getCategory({accept:false})
    
  }
  addEvent(event: MatDatepickerInputEvent<Date>) {

    if(event.value){
      this.date = event.value;
    }else{
      this.date = null;
    }
    
    this.validation = true
  }
 
  getCategory(accept:any) {
    try {
      if(accept){
        this.masterService.getCategoryList().subscribe((res: any) => {
          this.category_list = res.data;
          this.getSubcategory(this.category_list[0]._id)
          this.categoryId = this.category_list[0]._id
  
        }, (err: any) => {
          this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
        });
      }else{
          this.httpService.get(`/expense/getsubcategory/${this.categoryId}`).subscribe((res: any) => {
            this.categoryObj = []
            this.categoryArray =[]
            this.date=null
            this.categoryObj.push(res.data)
            this.subcategory_list=res.data.subCategory

          })
      }
      
    } catch (e) {
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }
  }

  getSubcategory(categoryId: Number) {
    try {
      let Id = this.categoryArray.includes(categoryId)
      if (Id) {
      
        let obj = []
        obj = this.categoryObj.filter((e) => categoryId == e._id)
        this.subcategory_list = obj[0].subCategory
        
      } else {
        this.httpService.get(`/expense/getsubcategory/${categoryId}`).subscribe((res: any) => {
          this.categoryArray.push(categoryId)
          this.categoryObj.push(res.data);
          this.categoryId = res.data._id
          this.subcategory_list = res.data.subCategory;
        }, (err: any) => {
          this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
        })
      }

    } catch (e) {
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }

  }
  
  onSave() {
    try {
      
      let ExpenseDetails = []

      let categoryObj = {}

      this.categoryObj.forEach((ele, i) => {
        categoryObj = {
          categoryObj: ele
        }
        
        ExpenseDetails.push(categoryObj)
        let data = {
          expenseDate: this.date,
          ExpenseDetails: ExpenseDetails
        }
        if (i === this.categoryObj.length - 1) {
          
          try {
            
            this.httpService.post(`createexpense`, data).subscribe((res: any) => {
              if (res.success) {
                // this.expenseId = res.data._id
              } else {                
                this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
              }

            },
            (err:any)=>{
              console.log('0nsave err',err);
              
              this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
            })
          } catch (e) {
            console.log('---in catch in post')
            this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
          }
        }

      })



    } catch (e) {
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }
  }

  put() {
    // this.categoryObj.ExpenseDetails.push({ category: this.categoryId, subCatDetails: this.subcategory_list })
    let d = this.categoryObj
    this.httpService.put(`/expense/${this.expenseId}`, d).subscribe((res: any) => {
    })
  }

  ngOnDestroy() {
    try {

    } catch (e) {

    }
  }
}

