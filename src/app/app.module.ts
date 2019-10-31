import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './shared/modules/app-material.module';
import { AppComponent } from './app.component';
import { ListCategoryComponent } from './views/masters/category/list-category/list-category.component';
import { SaveCategoryComponent } from './views/masters/category/save-category/save-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListUserComponent } from './views/masters/user/list-user/list-user.component';
import { SaveUserComponent } from './views/masters/user/save-user/save-user.component';
import { ListRoleComponent } from './list-role/list-role.component';
import { SaveRoleComponent } from './save-role/save-role.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCategoryComponent,
    SaveCategoryComponent,
    ListUserComponent,
    SaveUserComponent,
    ListRoleComponent,
    SaveRoleComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
