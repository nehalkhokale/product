import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './list-category/list-category.component';
import { SaveCategoryComponent } from './save-category/save-category.component';
const routes: Routes = [
  {path:'',redirectTo:'list-category',pathMatch:'full'},
  { path: 'list-category', component: ListCategoryComponent },
  { path: 'save-category', component: SaveCategoryComponent },  
];


@NgModule({
 
  exports:[
    RouterModule,
  ],
 
  imports: [
    
    RouterModule.forChild(routes)
  ]
})
export class CategoryRoutingModule { }
