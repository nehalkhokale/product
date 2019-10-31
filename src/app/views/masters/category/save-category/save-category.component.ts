import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { HttpService } from "../../../../shared/services/http.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { Location } from "@angular/common";
export interface Category {
  _id: Number;
  category: string;
  subCategory: string;
  isActive: boolean;
  createdAt: Date;
  updattedAt: Date;
  updatedBy: any;
  createdBy: any;
  remarks: any;
}

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
  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
    private location: Location
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
      subCategory: new FormControl('')
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
    console.log('data',data);
    
    if (this.actionValue === 'add') {
      this.httpService.post("createcategory", data).subscribe((res: any) => {
        if (res.success) {
          this.location.back();
        }
      });
    } else {
      this.httpService
        .put(`updatecategory/${this.categoryId}`, data)
        .subscribe((res: any) => {
          if (res.success) {
            this.location.back();
          }
        });
    }
  }
  getCategory(){
    console.log('categoryId',this.categoryId);
    
    this.httpService.get(`categorybyid/${this.categoryId}`).subscribe((res:any)=>{
      this.categoryObj = res.data
      let subCategoryArray : string[]= [];
      res.data.subCategory.forEach((subCategoryName,index)=>{
        subCategoryArray.push(subCategoryName.name)
      })  
      this.categoryObj.subCategoryName = subCategoryArray
      this.categoryDetail = new FormGroup({
        category: new FormControl(this.categoryObj.category, Validators.required),
        subCategory: new FormControl(this.categoryObj.subCategory, Validators.required)
      });
    })
  }

}
