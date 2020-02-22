import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { HttpService } from "../../../../shared/services/http.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { Location } from "@angular/common";
import {SnackbarService} from '../../../../shared/services/snackbar.service'
import{Category} from '../../../../shared/models/category.model';
import { MasterService } from '../../../../shared/services/master.service'

const ELEMENT_DATA: Category[] = [];
@Component({
  selector: "app-save-category",
  templateUrl: "./save-category.component.html",
  styleUrls: ["./save-category.component.scss"]
})
export class SaveCategoryComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  categoryObj: any = {
    category: "",
    subCategory: []
  };
  categoryId: Number;
  actionValue: String;
  subCategory: any;
  categoryDetail: FormGroup;
  url: any;
  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
    private location: Location ,
    private masterService: MasterService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.router.params.subscribe(params => {
      this.categoryId = params['Id'];
      this.actionValue = params['action'];
      if (this.actionValue === "edit") {
        this.getCategory();
      }
    });
  }
  
  initializeForm() {
    this.categoryDetail = new FormGroup({
      category: new FormControl('', Validators.required),
      
    });
  }
  subCategoryValue: string = "";
  addSubCategory() {
    this.categoryObj.subCategory.push({ name: this.subCategoryValue });
  }

  remove(indexValue: Number) {
    this.categoryObj.subCategory.splice(indexValue, 1);
  }
  onSave() {
    let data = this.categoryDetail.value;
    data.subCategory = this.categoryObj.subCategory;
    console.log('data', data);
    this.url =(this.actionValue === 'add')?"createcategory" :`updatecategory/${this.categoryId}`
    this.masterService.onAddButton(this.actionValue,data, this.url)
    
    // if (this.actionValue === 'add') {
    //   try{
      // this.httpService.post("createcategory", data).subscribe((res: any) => {
      //   if (res.success) {
      //     this.snackBar.openSnackBar(res.message, 'Close', 'green-snackbar')
      //     this.location.back();
      //   }
      //   else{
      //     this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
      //   }
      // },
      // (err:any)=>{
      //   this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
      // }
      
    //   );}
    //   catch(e){
    //     this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    //   }
    // } else {
    //   try{
    //   this.httpService
    //     .put(`updatecategory/${this.categoryId}`, data)
    //     .subscribe((res: any) => {
    //       if (res.success) {
    //         this.snackBar.openSnackBar(res.message, 'Close', 'green-snackbar')
    //         this.location.back();
    //       }
    //       else{
    //         this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
    //       }
    //     },
    //     (err:any)=>{
    //       this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
    //     }
        
    //     );}
    //     catch(e){
    //       this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    //     }
    // }
  }

  getCategory(){
    try{
    this.httpService.get(`categorybyid/${this.categoryId}`).subscribe((res:any)=>{
      this.categoryObj = res.data
      let subCategoryArray : string[]= [];
      res.data.subCategory.forEach((subCategoryName,index)=>{
        subCategoryArray.push(subCategoryName.name)
      })  
      this.categoryObj.subCategoryName = subCategoryArray
      this.categoryDetail = new FormGroup({
        category: new FormControl(this.categoryObj.category, Validators.required),
      });
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
