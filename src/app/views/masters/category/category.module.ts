import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoryComponent } from './list-category/list-category.component';
import { SaveCategoryComponent } from './save-category/save-category.component';
import {CategoryRoutingModule} from './category-routing.module';
import { AppMaterialModule } from '../../../shared/modules/app-material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    ListCategoryComponent,
    SaveCategoryComponent
  ],
  imports: [
    CommonModule,    
    // HttpClientModule,
    // AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    // BrowserAnimationsModule,
    CategoryRoutingModule,
  ]
})
export class CategoryModule { }
