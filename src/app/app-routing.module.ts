import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/loginpage/login.component';
import { ResetPasswordComponent } from './views/login/reset-password/reset-password.component';
import { EditExpenseCategoryComponent } from './views/Expenses/edit-expense-category/edit-expense-category.component';
import {
  AuthGuard
} from './shared/services/auth.guard';
import { EditExpenseComponent } from './views/Expenses/edit-expense/edit-expense.component';
// import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AddSubcategoryComponent } from './views/Expenses/add-subcategory/add-subcategory.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import{BudgetComponent} from './views/budget/budget.component';
const routes: Routes = [
  // {path: 'disable', component: DisablecontroldirectiveDirective },
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expense', component: EditExpenseComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'expense/addsubcategory', component: AddSubcategoryComponent, canActivate: [AuthGuard] },
  { path: 'expense/editexpense', component: EditExpenseCategoryComponent },
  // {path: 'expense/addsubcategory', component: AddSubcategoryComponent, canActivate:[AuthGuard] },
  { path: 'resetpassword', component: ResetPasswordComponent, canActivate: [AuthGuard] },
  { path: 'role', loadChildren: './views/masters/role/role.module#RoleModule', canActivate: [AuthGuard] },
  { path: 'category', loadChildren: './views/masters/category/category.module#CategoryModule', canActivate: [AuthGuard] },
  { path: 'user', loadChildren: './views/masters/user/user.module#UserModule', canActivate: [AuthGuard] },
  // {path:'**',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
