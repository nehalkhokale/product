import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
