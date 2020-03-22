import { Component, OnInit ,ViewChild} from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { HttpService } from '../../shared/services/http.service';
// import { ChartComponent } from "ng-apexcharts";
import { Router } from '@angular/router';
// import {
//   ApexNonAxisChartSeries,
//   ApexResponsive,
//   ApexChart
// } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip
} from "ng-apexcharts";
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { log } from 'util';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};
export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsBar: Partial<ChartOptions>;
  public chartOptionsPie: Partial<ChartOptionsPie>;

  counter: number = 0;
  today: Date = new Date()
  // month: number = this.today.getMonth();
  // year: number = this.today.getFullYear();
  // day: number = this.today.getDate();
  latestMonth: Date;
  latestDay: Date;
  latestYear: Date;
  dateValue: any;
  selectionButtonArray : string[] = ['day','month','year'];
    
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
        let amount: number[] = [];
  
        result.filter((e) => {
          name = name.concat(e.name)
          amount = amount.concat(e.y)
        })
        console.log('name , amount',amount,name);
        this.chartOptionsBar = {
          series: [
            {
              data: amount
            }
          ],
          chart: {
            type: "bar",
            height: 380,
            toolbar:{
              show:false
            },
            events:{
              dataPointSelection: (event,chartContext,config) => {
                let catergoryName=config.w.config.xaxis.categories[config.dataPointIndex]
                this.editExpense(catergoryName,this.requestBody)
              }
            },
          },
          plotOptions: {
            bar: {
              barHeight: "100%",
              distributed: true,
              horizontal: true,
              dataLabels: {
                position: "bottom"
              }
            }
          },
          colors: [
            "#33b2df",
            "#546E7A",
            "#d4526e",
            "#13d8aa",
            "#A5978B",
            "#2b908f",
            "#f9a3a4",
            "#90ee7e",
            "#f48024",
            "#69d2e7"
          ],
          dataLabels: {
            enabled: false,
            textAnchor: "start",
            style: {
              colors: ["#fff"]
            },
            formatter: function(val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
            },
            offsetX: 0,
            dropShadow: {
              enabled: true
            }
          },
          stroke: {
            width: 1,
            colors: ["#fff"]
          },
          xaxis: {
            categories: name
          },
          yaxis: {
            labels: {
              show: true
            }
          },
          title: {
            text: "",
            align: "center",
            floating: true
          },
          subtitle: {
            text: "",
            align: "center"
          },
          tooltip: {
            theme: "dark",
            x: {
              show: true
            },
            y: {
              title: {
                formatter: function() {
                  return "";
                }
              }
            }
          }
        };
    
        this.chartOptionsPie = {
          series: amount,
          chart: {
            //categoryName:string,Date:Date
            events:{
              dataPointSelection: (event,chartContext,config) => {
                let catergoryName=config.w.config[config.dataPointIndex]
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
        this.dateValue = dt.toLocaleString('default', { month: 'long' }) + ' '+  dt.getFullYear().toString();
    }else if(selection === 'day'){
      dt.setDate(dt.getDate() + value);
      this.dateValue = dt.toLocaleString('default', { weekday: 'long' }) + ', ' 
          + dt.getDate() + ' ' 
          + dt.toLocaleString('default', { month: 'long' }) + ' ' + dt.getFullYear().toString();
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

  graphValue: string = "pie";
  graphSelection(graphType: string){
    try {
      console.log('graphType', graphType);
      this.graphValue = graphType;
      // this.graphValue = event.target.innerText === 'bar_chart' ? 'bar' 
      //   : (event.srcElement.innerText === 'pie_chart' ? 'pie' : '');
      console.log('this.graphValue', this.graphValue);
      // this.chartOptions = value === "bar" ? this.chartOptionsBar : this.chartOptionsPie
    } catch (e) {
      
    }
  }

}
 