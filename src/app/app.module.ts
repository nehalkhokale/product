import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './shared/modules/app-material.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/services/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {  AuthGuardService  } from './shared/services/auth-guard.service';
import {HttpInterceptorService} from './shared/services/httpinterceptors.service';
// import { ListCategoryComponent } from './views/masters/category/list-category/list-category.component';
// import { SaveCategoryComponent } from './views/masters/category/save-category/save-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ListUserComponent } from './views/masters/user/list-user/list-user.component';
// import { SaveUserComponent } from './views/masters/user/save-user/save-user.component';
// import { ListRoleComponent } from './views/masters/Role/list-role/list-role.component';
// import { SaveRoleComponent } from './views/masters/Role/save-role/save-role.component';
import { DialogserviceComponent } from './shared/components/dialogservice/dialogservice.component';
import { LoginComponent } from './views/login/loginpage/login.component';
import { ResetPasswordComponent } from './views/login/reset-password/reset-password.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SaveExpenseComponent } from './views/Expenses/save-expense/save-expense.component';
import { AddSubcategoryComponent } from './views/Expenses/add-subcategory/add-subcategory.component';
// import { DisablecontroldirectiveDirective } from './shared/services/disablecontroldirective.directive';

@NgModule({
  entryComponents:[
    DialogserviceComponent,
    // DisablecontroldirectiveDirective
  ],
  declarations: [
    AppComponent,
    // ListCategoryComponent,
    // SaveCategoryComponent,
    // ListUserComponent,
    // SaveUserComponent,
    // ListRoleComponent,
    // SaveRoleComponent,
    DialogserviceComponent,
    LoginComponent,
    ResetPasswordComponent,
    NavbarComponent,
    SaveExpenseComponent,
    AddSubcategoryComponent,
    // DisablecontroldirectiveDirective,
    

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
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    // {
    //   provide:  AuthGuardService,
    //   useClass: AuthGuard,
    // },
    AuthGuardService,AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
