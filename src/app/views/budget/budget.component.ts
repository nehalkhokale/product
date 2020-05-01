import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { HttpService } from '../../shared/services/http.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  
  budgetForm: FormGroup;
  userDetails: any;
  selectionButtonArray : string[] = ['month','year'];
  selection: string = 'month';

  constructor( 
    private httpService: HttpService,
    private snackBar: SnackbarService, 
  ) { }
  percent:number;
  ngOnInit() {
    try {
      this.budgetForm = new FormGroup({
        type: new FormControl('month'),
        value:new FormControl('', Validators.required),
        firstTrigger:new FormControl(10, Validators.required),
        lastTrigger:new FormControl(0),
      });
      console.log('--form',this.budgetForm.value.firstTrigger);
      
    } catch (error) {
      this.snackBar.openSnackBar(error.message, 'Close', 'red-snackbar');
    }
   
  }
  lastTriggerChange(event:any){
    if(event.value < this.budgetForm.value.firstTrigger){
      event.source.value=this.budgetForm.value.firstTrigger
    }
  }
  onSave(){
    try {
      this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
      let data = {
        budget:this.budgetForm.value,
        id:this.userDetails._id
      }
      this.httpService.post('createBudget',data).subscribe((res: any) => {
        if (res.success) {
          this.snackBar.openSnackBar('Buget created', 'Close', 'green-snackbar');

        }else{
          this.snackBar.openSnackBar(res.message, 'Close', 'red-snackbar');
        }
      })
    } catch (error) {
      this.snackBar.openSnackBar(error.message, 'Close', 'red-snackbar');
    }
    
  }
}
