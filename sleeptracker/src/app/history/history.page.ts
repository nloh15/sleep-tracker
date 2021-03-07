import { Component, OnInit,ViewChild } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  @ViewChild('barChart') barChart;  
  @ViewChild('sleepChart') sleepChart;  
  sleepArray: OvernightSleepData[];
  sleepinessArray: StanfordSleepinessData[];
  sleepHistory: Array<String>[];
  sleepinessHistory: Array<String>[];
  bars: any;
  colorArray: any;

  constructor(public sleepService:SleepService) { }

  ngOnInit() {
    this.sleepArray = this.allOvernightData.reverse();
    this.sleepinessArray = this.allSleepinessData.reverse();
    this.sleepinessHistory = this.formatSleepinessHistory;
  }

  get allSleepData() {
    return SleepService.AllSleepData;
  }

  get allOvernightData() {
    return SleepService.AllOvernightData;
  }

  get allSleepinessData() {
    return SleepService.AllSleepinessData;
  }

  get totalHours() {
    return 0;
  }

  options = {
      slidesPerView: 1.3,
  }

  get recordedTime() {
    //time = data.loggedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    return "lalala";
  }

  get formatSleepinessHistory(){
    var currentSleepHistory = [];

    console.log(this.sleepinessArray);
    console.log(this.sleepArray);

    for (var i in this.sleepinessArray) {
      var currentSleepinessData = this.sleepinessArray[i];
      var tanggal = currentSleepinessData.loggedAt.toLocaleDateString('en-US', {month: 'long', day: 'numeric' });

      var jam = currentSleepinessData.loggedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      var level = currentSleepinessData.summaryString();

      var sleepLog = [tanggal, jam, level];
      currentSleepHistory.push(sleepLog);
      
    }

    // First data: date logged
    // Second data: time logged
    // Third data: level of sleepiness

    return currentSleepHistory;
  }

  get averageHours(){
    var currentSleepHistory = [];
    var total = 0;

    for (var i in this.sleepArray) {
      var currentSleepData = this.sleepArray[i];
      
      var total = total + currentSleepData.getHours();
      
    }
    var ave = total/3600000;
    ave = ave/ this.sleepArray.length;

    var hrs = ave.toFixed();

    if (parseInt(hrs) > ave){
      var num = parseInt(hrs) -1;
    }
    else{
      var num = parseInt(hrs);
    }
    
    
    var min = ave - num;
    min = min*60;
    var minInt = min.toFixed();
    var hrsInString = num+' hrs, '+minInt + ' mins';

    return hrsInString;
  }

  get averageLevel(){
    var currentSleepHistory = [];
    var total = 0;

    for (var i in this.sleepinessArray) {
      var currentSleepData = this.sleepinessArray[i];
      
      var total = total + currentSleepData.sleepinessLevel();
      
    }


    var ave = total/this.sleepinessArray.length;
    var hello = ave.toFixed();

    if (parseInt(hello) > ave){
      var num = parseInt(hello) -1;
    }
    else{
      var num = parseInt(hello);
    }

    return num;
  }
  
  ionViewDidEnter() {
    this.createBarChart();
    this.createSleepChart();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data: this.formatSleepinessLevel,
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createSleepChart() {
    this.bars = new Chart(this.sleepChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.formatSleepDate,
        datasets: [{
          label: 'Sleep Duration',
          data: this.formatSleepLevel,
          backgroundColor: 'rgb(255, 204, 153)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(255, 204, 153)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  get formatSleepinessLevel(){
    var currentSleepHistory = [];

    for (var i in this.sleepinessArray) {
      var currentSleepinessData = this.sleepinessArray[i];
      var level = currentSleepinessData.sleepinessLevel();

      currentSleepHistory.push(level);
      
    }
    return currentSleepHistory;
  }

  get formatSleepLevel(){
    var currentSleepHistory = [];

    for (var i in this.sleepArray) {
      var currentSleepData = this.sleepArray[i];
      var level = currentSleepData.getHours();
      level = level/3600000;

      currentSleepHistory.push(level);
      
    }
    return currentSleepHistory;
  }

  get formatSleepDate(){
    var currentSleepHistory = [];

    for (var i in this.sleepArray) {
      var currentSleepData = this.sleepArray[i];
      var level = currentSleepData.dateString();

      currentSleepHistory.push(level);
      
    }
    return currentSleepHistory;
  }

}
