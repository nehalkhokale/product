import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCategoryComponent } from './views/masters/category/list-category/list-category.component';

const routes: Routes = [
  { path: 'list-category', component: ListCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
