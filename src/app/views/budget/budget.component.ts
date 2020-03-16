import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  
  budgetForm: FormGroup;

  
  selectionButtonArray : string[] = ['month','year'];
  selection: string = 'month';

  constructor() { }
  percent:number;
  ngOnInit() {
    try {
      this.budgetForm = new FormGroup({
        type: new FormControl('', Validators.required),
        value:new FormControl(0, Validators.required),
        firstTrigger:new FormControl(0, Validators.required),
        lastTrigger:new FormControl(0),
      });
    console.log('--this.Budget',this.budgetForm);
  
    } catch (error) {
      
    }
   
  }
  setPeriod(item:string){
    this.selection = item
  }
  onSave(){

    console.log('--lastTriggerValue',this.budgetForm.value.firstTrigger);
    console.log('--firstTriggerValue',this.budgetForm.value.lastTrigger);
    
  }
}
