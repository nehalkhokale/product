import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './shared/modules/app-material.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/services/auth.guard';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { EditExpenseComponent } from './views/Expenses/edit-expense/edit-expense.component';
import { AddSubcategoryComponent } from './views/Expenses/add-subcategory/add-subcategory.component';
import { EditExpenseCategoryComponent } from './views/Expenses/edit-expense-category/edit-expense-category.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
// import { DisablecontroldirectiveDirective } from './shared/services/disablecontroldirective.directive';
import { NgApexchartsModule } from "ng-apexcharts";
import { BudgetComponent } from './views/budget/budget.component';
// import { UserModule } from 'src/app/views/masters/user/user.module';
// import { ProfileImageComponent } from 'src/app/shared/components/profileImage/profile-image/profile-image.component';
import{commons} from 'src/app/commons.module'
@NgModule({
  entryComponents:[
    DialogserviceComponent,
    EditExpenseCategoryComponent,
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
    EditExpenseComponent,
    AddSubcategoryComponent,
    EditExpenseCategoryComponent,
    DashboardComponent,
    BudgetComponent,
    // ProfileImageComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    // UserModule,
    BrowserModule,
    NgApexchartsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    commons
  ],
  exports:[
    // ProfileImageComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    // {
    //   provide:  AuthGuardService,
    //   useClass: AuthGuard,
    // },
    AuthGuardService,AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
