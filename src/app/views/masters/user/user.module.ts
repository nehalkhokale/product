import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { SaveUserComponent } from './save-user/save-user.component';
import {UserRoutingModule} from './user-routing.module';
import { AppMaterialModule } from '../../../shared/modules/app-material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ListUserComponent,
    SaveUserComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
