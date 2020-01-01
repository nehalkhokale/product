import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { SaveUserComponent } from './save-user/save-user.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {path:'',redirectTo:'list-user',pathMatch:'full'},
  { path: 'list-user', component: ListUserComponent },
  { path: 'save-user', component: SaveUserComponent },  
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UserRoutingModule { }
