import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import{Category} from '../../../shared/models/category.model';
import { MasterService } from '../../../shared/services/master.service'
import { Router } from '@angular/router';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import {AuthGuardService} from '../../services/auth-guard.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  list_category: Category[] = [];
  isLoggedIn$: Observable<boolean>;

  constructor( private masterService: MasterService,private router: Router
    ,private snackBar: SnackbarService ,private authService:AuthGuardService,
    private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    console.log('--this.isLoggedIn$',this.isLoggedIn$);
    this.cdr.detectChanges()
    // this.getCategory()
  }

  getCategory(){
    this.router.navigate(['expense/addsubcategory'])
    // console.log('here navbar');   
  }
  logout(){
    // console.log('logout from component');    
    this.authService.logout();
  }
}
