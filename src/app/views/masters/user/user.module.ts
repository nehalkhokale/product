import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { SaveUserComponent } from './save-user/save-user.component';
import {UserRoutingModule} from './user-routing.module';
import { AppMaterialModule } from '../../../shared/modules/app-material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileImageComponent } from 'src/app/shared/components/profileImage/profile-image/profile-image.component';
import {commons} from 'src/app/commons.module'
@NgModule({
  declarations: [
    ListUserComponent,
    SaveUserComponent,
    // ProfileImageComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    UserRoutingModule,
    commons
  ],
  // exports:[ProfileImageComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class UserModule { }
