import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoleComponent } from './list-role/list-role.component';
import { SaveRoleComponent } from './save-role/save-role.component';
import {RoleRoutingModule} from './role-routing.module';
import { AppMaterialModule } from '../../../shared/modules/app-material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ListRoleComponent,
    SaveRoleComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    RoleRoutingModule,
  ]
})
export class RoleModule { }
