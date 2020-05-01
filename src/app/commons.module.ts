import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './shared/modules/app-material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileImageComponent } from 'src/app/shared/components/profileImage/profile-image/profile-image.component';
@NgModule({
  declarations: [
    ProfileImageComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  exports:[ProfileImageComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class commons { }
