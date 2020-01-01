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
  // categoryDetails$: Observable<boolean>;
  dateForm: FormControl;
  expenseId: Number;
  categoryArray: any = [];
  arrayIndex = 0;
  categoryId: Number;
  categoryObj: Expense[] = [];
  //  = {
  //   expenseDate: Date,
  //   ExpenseDetails: [{
  //     category: Number,
  //     subCatDetails: []
  //   }]
  // };
  arrayExpenseDetails: any;
  date: Date;
  actionValue: String;
  subcategory_list: Category[] = []
  // subcategory_list: any;
  category_list: any = []
  subCategoryForm: FormGroup;
  status: boolean;
  formSubCategory: FormGroup;
  panelOpenState = false;
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
    this.dateForm = new FormControl('', Validators.required)
    // this.initializeForm()
    this.expenseService.categoryDetails().subscribe((data) => {
      console.log('--data', data);
    });
    // console.log('---this.categoryDetails$', this.categoryDetails$);
    // this.status = true
    // this.activatedRoute.params.subscribe(params => {
    //   this.categoryId = params['Id'];
    //   this.actionValue = params['action'];
    //   this.date = params['date'];
    //   if (this.actionValue === "edit") {
    this.getCategory()

    //   }
    // });

  }
  addEvent(event: MatDatepickerInputEvent<Date>) {

    this.date = event.value
  }
  // initializeForm() {
  //   this.formSubCategory = new FormGroup({
  //     amount:new FormControl( '', [Validators.required]),
  //     paymentMode: new FormControl( '', [Validators.required]),
  //     subCategory: new FormControl( '', [Validators.required]),     
  //   });
  // }
  getCategory() {
    try {
      this.masterService.getCategoryList().subscribe((res: any) => {
        console.log('res in expense', res.data);
        this.category_list = res.data;
        this.getSubcategory(this.category_list[0]._id)
        this.categoryId = this.category_list[0]._id
        console.log('this.category_list', this.category_list[0]._id);

      }, (err: any) => {
        this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
      });
    } catch (e) {
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }
  }

  getSubcategory(categoryId: Number) {
    try {
      console.log('--categoryId getSubcategory', categoryId);

      let Id = this.categoryArray.includes(categoryId)
      if (Id) {
        let obj = []
        obj = this.categoryObj.filter((e) => categoryId == e._id)
        this.subcategory_list = obj[0].subCategory
      } else {
        this.httpService.get(`/expense/getsubcategory/${categoryId}`).subscribe((res: any) => {
          // this.categoryObj.ExpenseDetails.subCatDetails.push(res.data.subCategory);
          this.categoryArray.push(categoryId)
          this.categoryObj.push(res.data);
          console.log('res in subcat', this.categoryObj);
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
  // addCategory(count:number){
  //   count=this.counter ++
  //   this.categoryObj.ExpenseDetails[count].subCatDetails.push({ subCategory: subCategoryName ,amount:this.formSubCategory.value.amount,paymentMode:this.formSubCategory.value.paymentMode});
  //   console.log('---subCategoryId',subCategoryName);

  //   //'/expense'

  // }
  onSave() {
    try {

      // console.log('--subcategory_list', this.subcategory_list);
      // console.log('--this.categoryObj', this.categoryObj);

      let ExpenseDetails = []

      let categoryObj = {}

      // console.log('-- here this.categoryObj', this.categoryObj);

      this.categoryObj.forEach((ele, i) => {
        // console.log('----here', ele);

        categoryObj = {
          categoryObj: ele
        }
        ExpenseDetails.push(categoryObj)
        // console.log('--ExpenseDetails', ExpenseDetails);

        // console.log('i', i, this.categoryObj.length - 1, ExpenseDetails);
        let data = {
          expenseDate: this.date,
          ExpenseDetails: ExpenseDetails
        }

        // console.log('---data', data);
        if (i === this.categoryObj.length - 1) {
          
          try {
            console.log('----here')
            this.httpService.post(`createexpense`, data).subscribe((res: any) => {
              console.log('res', res);
              if (res.success) {
                this.expenseId = res.data._id
              } else {
                this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
              }

            },
            (err:any)=>{
              this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
            })
          } catch (e) {
            console.log('---in catch')
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
      console.log('---res', res);
    })
  }

  ngOnDestroy() {
    try {

    } catch (e) {

    }
  }
}

