import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { Router } from '@angular/router';
import { AppConfigServiceService } from '../../../shared/services/app-config-service.service'
// import {  HttpClient,HttpBackend } from '@angular/common/http';
import { AuthGuardService } from '../../../shared/services/auth-guard.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import {ExpenseService} from 'src/app/shared/services/expense.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[ExpenseService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private httpService: HttpService,
    private snackBar: SnackbarService, private router: Router,
    private appConfigServiceService: AppConfigServiceService,
    private authGuardService: AuthGuardService,
    private cdr: ChangeDetectorRef,
    private expenseService :ExpenseService) { }
    passwordType: string ='password';
    passwordShown:boolean = false ;
    isLoggedIn$: Observable<boolean>;
    
  ngOnInit() {
    this.authGuardService.logout()
    this.initializeForm()
    // this.appConfigServiceService.clearSession()
    this.cdr.detectChanges()
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  showLoading: boolean = false;
  onLogin() {
    
      // console.log('---data', data);
      try {
        this.showLoading = true;
        let data = this.loginForm.value;
        this.httpService.post('user/login', data).subscribe((res: any) => {
          this.showLoading = false;
          if (res.success) {
            sessionStorage.setItem('Token', JSON.stringify(res.data.token));
            sessionStorage.setItem('userDetails', JSON.stringify(res.data));
            this.expenseService.emitLoginValue(true)
            this.authGuardService.login()
            // this.router.navigate(['category/list-category', { action: 'add' }])

          } else {
            this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
          }
        })
      } catch (e) {
        this.showLoading = false;
        this.snackBar.openSnackBar(e.message, 'Close', 'red-snackbar');
      }
  }
  hide: boolean = true;
  
  onChangePassword() {
    this.router.navigate(['category/save-category', { action: 'add' }])
  }
  unhide(){
    if(this.hide){
      this.hide= false
      var set =setTimeout(()=>{
       this.hide=true
      }, 3000);
    }else{
      this.hide=true
      clearTimeout(set)
    }
  }
}
