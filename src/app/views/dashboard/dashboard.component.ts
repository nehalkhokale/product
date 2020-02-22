import { Component, OnInit ,ViewChild} from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { HttpService } from '../../shared/services/http.service';
import { ChartComponent } from "ng-apexcharts";
import { Router } from '@angular/router';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  counter: number = 0;
  today: Date = new Date()
  // month: number = this.today.getMonth();
  // year: number = this.today.getFullYear();
  // day: number = this.today.getDate();
  latestMonth: Date;
  latestDay: Date;
  latestYear: Date;
  dateValue: any;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private snackBar: SnackbarService,
  ) { }

  requestBody = {
    "value": '',
    "flag": '',
    "year": '',
    "month": ''
  }

  ngOnInit() {
    try {
      this.selectionDate = new Date();
      this.dateValue =this. today.toLocaleString('default', { weekday: 'long' }) + ', ' 
          + this.today.getDate() + ' - ' 
          + this.today.toLocaleString('default', { month: 'long' }) + '-' + this.today.getFullYear().toString();
      this.expenseChart()
    } catch (e) {
      
    }
  }

  displayChart: boolean = false;
  expenseChart() {
    try{
      this.httpService.post('dateWiseReport', this.requestBody).subscribe((res: any) => {
        let result = res.data;
        // console.log('---expenseChart');
        
        /* To display chart when data available and message when 
        data not available */
        if(res.data && res.data.length > 0){
          this.displayChart = true;
        }else{
          this.displayChart = false;
        }

        let name = [];
        let amount = []
  
        result.filter((e) => {
          name = name.concat(e.name)
          amount = amount.concat(e.y)
        })
        // console.log('name , amount',name,amount);
        
        this.chartOptions = {
          series: amount,
          chart: {
            //categoryName:string,Date:Date
            events:{
              dataPointSelection: (event,chartContext,config) => {
                // console.log('--config',config);
                let catergoryName=config.w.config.labels[config.dataPointIndex]
                // console.log('---------catergoryName',catergoryName);
                
                this.editExpense(catergoryName,this.requestBody)
              }
            },
            type: "donut"
          },
          labels:name,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };
      }, (err: any) => {
        this.snackBar.openSnackBar(err.error.message, 'Close', 'red-snackbar');
      })
    }catch(e){
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }
  }

  editExpense(catergoryName,requestBody){
    try{
      this.router.navigate(['expense',{action:'categoryFilter',categoryName:catergoryName ,
      dateValue:requestBody.value,flag:requestBody.flag,year:requestBody.year,month:requestBody.month}]);
      // console.log('---requestBody is in editexpense',requestBody);
      
    }catch(e){
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }
  }

  selection: string = 'day';
  selectionDate: Date;
  // getExpenseChart(flag, counterResetFlag) {
  //   try {
  //   // this.selection = flag;
  //   // var dt = this.selectionDate;
  //   // console.log('this.selectionDate', this.selectionDate);     
     
      
  //     // // console.log('--here in here ', typeof flag, flag == 'Day');
  //     // if(counterResetFlag){
  //     //   this.counter = 0
  //     // }

  //     // if (flag == 'Month') {

  //     //   // dt.setMonth(dt.getMonth() + 2);
  //     //   // console.log('--here-- Month');

  //     //   /*
  //     //   this.month = (this.latestDay) ? this.latestDay.getMonth() : (this.latestYear) ? this.latestYear.getMonth() : this.today.getMonth();
  //     //   let currentYear = (this.latestDay) ? this.latestDay.getFullYear() : (this.latestYear) ? this.latestYear.getFullYear() : this.today.getFullYear();
  //     //   this.latestMonth = new Date(currentYear, this.month + this.counter, 1);
  //     //   this.year = this.latestMonth.getFullYear();
  //     //   */
  //     //   console.log('var latestMonth', this.latestMonth, ((this.month + this.counter).toString()));
  //     //   var variableMonth = this.month + this.counter;
  //     //   this.requestBody = {
  //     //     "value": this.latestMonth.toString(),
  //     //     "flag": "Month",
  //     //     "year": this.year.toString(),
  //     //     "month": variableMonth.toString()
  //     //   }

  //     //   const date = new Date(this.latestMonth);
  //     //   this.dateValue = date.toLocaleString('default', { month: 'long' }) + ' - '+  this.year.toString();
  //     // } else if (flag == 'Day') {
  //     //   console.log('--here-- Day');
  //     //   this.month = ( this.latestYear ) ? this.latestYear.getMonth() : ( this.latestMonth ) ? this.latestMonth.getMonth() : this.today.getMonth();
  //     //   var currentYear = ( this.latestYear ) ? this.latestYear.getFullYear() : ( this.latestMonth ) ? this.latestMonth.getFullYear() : this.today.getFullYear();
  //     //   let day = ( this.latestYear ) ? this.latestYear.getDate() : ( this.latestMonth ) ? this.latestMonth.getDate() :this.today.getDate();
  //     //   this.latestDay = new Date(currentYear, this.month, day + this.counter);;
  //     //   this.year = this.latestDay.getFullYear();
  //     //   console.log('--latestDay', this.latestDay,this.year);
  //     //   this.requestBody = {
  //     //     "value": this.latestDay.toString(),
  //     //     "flag": "Day",
  //     //     "year": this.year.toString(),
  //     //     "month": this.month.toString()
  //     //   }
  //     //   // this.dateValue = this.latestDay;
  //     //   this.dateValue = this.latestDay.toLocaleString('default', { weekday: 'long' }) + ', ' 
  //     //     + this.latestDay.getDate() + ' - ' 
  //     //     + this.latestDay.toLocaleString('default', { month: 'long' }) + '-' + this.year.toString();

  //     // } else if (flag == 'Year') {
  //     //   console.log('--here-- Year',this.latestDay,this.latestMonth );
  //     //   var currentYear =  ( this.latestMonth ) ? this.latestMonth.getFullYear() : (this.latestDay) ? this.latestDay.getFullYear()  : this.today.getFullYear();
  //     //   this.month =   ( this.latestMonth ) ? this.latestMonth.getMonth() : (this.latestDay) ? this.latestDay.getMonth()   : this.today.getMonth();
  //     //   var day =  ( this.latestMonth ) ? this.latestMonth.getDate() : (this.latestDay) ? this.latestDay.getDate()   : this.today.getDate();
  //     //   this.latestYear = new Date(currentYear + this.counter, this.month, day);
  //     //   this.year = this.latestYear.getFullYear();
  //     //   this.requestBody = {
  //     //     "value": this.latestYear.toString(),
  //     //     "flag": "Year",
  //     //     "year": ((this.year).toString()),
  //     //     "month": this.month.toString()
  //     //   }
  //     //   this.dateValue=  this.year,
  //     //   console.log('--latestYear', this.latestYear);
  //     // }
  //     // console.log('--Day this.requestBody', this.requestBody, this.dateValue);
  //     // this.expenseChart();
  //   } catch (e) {
  //     console.log(e);
  //     this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
  //   }
  // }

  increment() {
    try{

      this.setDate(1,this.selection);
      this.counter = this.counter + 1;
      // this.getExpenseChart(this.selection,false);
    }catch(e){
      console.log(e);
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }
  }

  decrement() {
    try{
      this.setDate(-1,this.selection);
      this.counter = this.counter - 1;
      // this.getExpenseChart(this.selection,false);
    }catch(e){
      console.log(e);
      this.snackBar.openSnackBar(e, 'Close', 'red-snackbar');
    }
  }

  setDate(value: number ,Choice:string){
    this.selection = Choice
    let selection = Choice.trim().toLocaleLowerCase();
    var dt = this.selectionDate;
  
    if(selection === 'year'){
      dt.setFullYear(dt.getFullYear() + value);
      this.dateValue=  dt.getFullYear().toString()
    }else if (selection === 'month'){
      dt.setMonth(dt.getMonth() + value);
        this.dateValue = dt.toLocaleString('default', { month: 'long' }) + ' - '+  dt.getFullYear().toString();
    }else if(selection === 'day'){
      dt.setDate(dt.getDate() + value);
      this.dateValue = dt.toLocaleString('default', { weekday: 'long' }) + ', ' 
          + dt.getDate() + ' - ' 
          + dt.toLocaleString('default', { month: 'long' }) + '-' + dt.getFullYear().toString();
    }
    this.requestBody = {
      "value": this.selectionDate.toString(),
      "flag": selection,
      "year": this.selectionDate.getFullYear().toString(),
      "month": this.selectionDate.getMonth().toString()
    }
    // console.log('000 ---this.selectionDate', this.selectionDate);
    // console.log('--this.dateValue',this.dateValue ,selection);
    // console.log('--requestBody in setDtae()',this.requestBody);
    
    this.expenseChart();
    
  }

  // getMonth(){
  //   var today = new Date();
  //   console.log('today.getMonth()+1;  ',today.getMonth()+1);
  //   // this.mm= today.getMonth();
  //   this.mm = today.getMonth()+1;     
  //   if(this.mm<10) {
  //   this.mm='0'+this.mm        
  //       }
  //   }
  //   getYear(){
  //     var today = new Date();
  //     this.yy = today.getFullYear();        
  //     for(var i = (this.yy-100); i <= this.yy; i++){
  //     this.years.push(i);}
  // }
  //  myDate :Date =new Date();
  //  isOpen:Boolean =false

}
