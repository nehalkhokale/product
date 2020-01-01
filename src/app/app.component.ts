import { Component } from '@angular/core';
import {Router} from '@angular/router'
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // mobileQuery: MediaQueryList;
  title = 'expense-tracker';
//   a: any[] = ['Category','Users','Role']
//  private _mobileQueryListener: () => void;
//   fillerNav = Array.from({length: 3}, (_, i) => [`this.a.${i + 1}`]);
  constructor(private router: Router,private media: MediaMatcher ,changeDetectorRef: ChangeDetectorRef,){
    // this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this._mobileQueryListener);
  }

 
}
