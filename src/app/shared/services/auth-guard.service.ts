import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService    {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private httpService: HttpService
  ) {}
  
  // get isLoggedIn() {
  //   this.httpService.get('/v1/auth/me').subscribe((res:any)=>{
  //     console.log('---in auth me',res);
     
  //     if(res.success){
  //        this.loggedIn.next(true)
  //     }
  //     else{
  //       this.loggedIn.next(false)
  //     }
  //   })
  //   // console.log('a',a);

  //   // return a
    
  //   return this.loggedIn.asObservable();
  // }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  

  login() {
    // if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['role']);
    // }
  }

  logout() {
    // console.log('logout from service');

    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
  
}
