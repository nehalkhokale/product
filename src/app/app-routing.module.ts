import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCategoryComponent } from './views/masters/category/list-category/list-category.component';
import { SaveCategoryComponent } from './views/masters/category/save-category/save-category.component';
import { ListUserComponent } from './views/masters/user/list-user/list-user.component';
import { SaveUserComponent } from './views/masters/user/save-user/save-user.component';

const routes: Routes = [
  { path: 'list-category', component: ListCategoryComponent },
  { path: 'save-category', component: SaveCategoryComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'save-user', component: SaveUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
