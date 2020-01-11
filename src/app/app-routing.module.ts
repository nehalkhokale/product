import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/loginpage/login.component';
import { ResetPasswordComponent } from './views/login/reset-password/reset-password.component';
import { 
  AuthGuard 
} from './shared/services/auth.guard';
import { EditExpenseComponent } from './views/Expenses/edit-expense/edit-expense.component';
// import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AddSubcategoryComponent } from './views/Expenses/add-subcategory/add-subcategory.component';
// import { DisablecontroldirectiveDirective } from './shared/services/disablecontroldirective.directive';

const routes: Routes = [
  // {path: 'disable', component: DisablecontroldirectiveDirective },
  { path: '', component: LoginComponent},
  {path: 'expense', component: EditExpenseComponent, canActivate:[AuthGuard]},
  {path: 'expense/addsubcategory', component: AddSubcategoryComponent, canActivate:[AuthGuard] },
  { path: 'resetpassword', component: ResetPasswordComponent ,canActivate: [AuthGuard] },
  { path:'role', loadChildren: './views/masters/Role/role.module#RoleModule',canActivate: [AuthGuard]  },
  { path:'category', loadChildren: './views/masters/category/category.module#CategoryModule' ,canActivate: [AuthGuard] },
  { path:'user', loadChildren: './views/masters/user/user.module#UserModule' ,canActivate: [AuthGuard] },
  // {path:'**',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
