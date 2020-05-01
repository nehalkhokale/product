import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  
  private expense: BehaviorSubject<any> = new BehaviorSubject<any>({
    date:'',
    category:'',
  });

  constructor() { }

  categoryDetails() {
    return this.expense.asObservable();
  }
 
  category(categoryDetail:any){
    this.expense.next(categoryDetail)
  }

  private loginValue = new Subject<any>();
  loginValueEmitter$ = this.loginValue.asObservable();
  emitLoginValue(value:boolean){
    console.log('---', value);
    this.loginValue.next(value);
  }

  private profileEvent = new Subject<any>();
  private userObj = new Subject<any>();
  

  profileEvent$= this.profileEvent.asObservable()
  userObj$= this.userObj.asObservable()
  
  emitValue(value:any){
    this.profileEvent.next(value)
  }

  emitValueObject(value:any){
    console.log('--emit');
    this.userObj.next(value)
  }
}
