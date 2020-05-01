import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Category } from '../../../shared/models/category.model';
import { MasterService } from '../../../shared/services/master.service'
import { ExpenseService } from 'src/app/shared/services/expense.service'
import { Router } from '@angular/router';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { AuthGuardService } from '../../services/auth-guard.service'
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  list_category: Category[] = [];
  userDetails: any;
  isLoggedIn$: Observable<boolean>;
  afterLogin$: Observable<any>;
  list: any = ['Change password', 'Profile'];
  loginSubscription: Subscription;

  constructor(private masterService: MasterService, private router: Router
    , private snackBar: SnackbarService, private authService: AuthGuardService,
    private cdr: ChangeDetectorRef,
    private expenseService: ExpenseService) {
    
    this.loginSubscription = expenseService.loginValueEmitter$.subscribe((userLoggedIn) => {
      console.log('--user logged in in navbar ---', userLoggedIn);

      if (userLoggedIn) {

        this.expenseService.emitValueObject({
          userObj: this.userDetails,
          pageIndicator: false
        })
      }
    })
  }

  ngOnInit() {
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));


    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.cdr.detectChanges()
    console.log('--user object', this.userDetails);
  }

  getCategory() {
    this.router.navigate(['expense/addsubcategory'])
  }
  logout() {
    this.authService.logout();
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }
  profile() {
    document.getElementById("list").style.width = "50%";
  }
  userDetail() {
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    this.router.navigate(['user/save-user', { action: 'edit', Id: this.userDetails._id, isProfile: true }]);
  }
  resetpassword() {
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    this.router.navigate(['resetpassword', { action: 'edit', Id: this.userDetails._id }]);
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("list").style.width = "0";
  }
  navigate(path: string) {
    this.closeNav();
    this.router.navigate([path]);
  }

}
