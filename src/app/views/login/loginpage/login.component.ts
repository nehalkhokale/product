import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { Router } from '@angular/router';
import { AppConfigServiceService } from '../../../shared/services/app-config-service.service'
// import {  HttpClient,HttpBackend } from '@angular/common/http';
import { AuthGuardService } from '../../../shared/services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private httpService: HttpService,
    private snackBar: SnackbarService, private router: Router,
    private appConfigServiceService: AppConfigServiceService,
    private authGuardService: AuthGuardService,
    private cdr: ChangeDetectorRef) { }

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
    this.showLoading = true;
      let data = this.loginForm.value;
      // console.log('---data', data);
      try {
        this.httpService.post('user/login', data).subscribe((res: any) => {
          if (res.success) {
            sessionStorage.setItem('Token', JSON.stringify(res.data.token));
            sessionStorage.setItem('userDetails', JSON.stringify(res.data));

            this.authGuardService.login()
            // this.router.navigate(['category/list-category', { action: 'add' }])

          } else {
            this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
          }
        })
      } catch (e) {
        this.snackBar.openSnackBar(e.message, 'Close', 'red-snackbar');
      }
  }

  onChangePassword() {
    this.router.navigate(['category/save-category', { action: 'add' }])
  }

}
