import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListRoleComponent } from './list-role/list-role.component';
import { SaveRoleComponent } from './save-role/save-role.component';
const routes: Routes = [
  {path:'',redirectTo:'list-role',pathMatch:'full'},
  { path: 'list-role', component: ListRoleComponent },
  { path: 'save-role', component: SaveRoleComponent },  
];


@NgModule({
  exports: [ RouterModule,],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class RoleRoutingModule { }
