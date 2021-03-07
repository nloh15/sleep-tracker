import { Component, OnInit,ViewChild } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-history2',
  templateUrl: './history2.page.html',
  styleUrls: ['./history2.page.scss'],
})
export class History2Page implements OnInit {
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
    this.sleepinessArray = this.allSleepinessData;
    this.sleepinessHistory = this.formatSleepinessHistory;
    var test = this.mostFrequentLevel;
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
    this.sleepinessArray.reverse();
    for (var i in this.sleepinessArray) {
      var currentSleepinessData = this.sleepinessArray[i];
      var tanggal = currentSleepinessData.loggedAt.toLocaleDateString('en-US', {month: 'long', day: 'numeric' });

      var jam = currentSleepinessData.loggedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      var level = currentSleepinessData.summaryString();

      var sleepLog = [tanggal, jam, level];
      currentSleepHistory.push(sleepLog);
      
    }

    this.sleepinessArray.reverse();
    // First data: date logged
    // Second data: time logged
    // Third data: level of sleepiness

    return currentSleepHistory;
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

  get mostFrequentLevel(){
    var levelToCount = new Map;

    for (var i = 0; i < this.sleepinessArray.length; i++){
      var currentLevel = this.sleepinessArray[i].sleepinessLevel();
      if (levelToCount.has(currentLevel)){
      // Increment count by 1 if activity already stored in map
      levelToCount.set(currentLevel, levelToCount.get(currentLevel) + 1);
      }
      else {
        levelToCount.set(currentLevel, 1);
      }
    }

    var sortedlevelToCount= new Map([...levelToCount.entries()].sort((a, b) => b[1] - a[1]));
    var it = sortedlevelToCount.keys();

    // Return first key in the map
    return it.next().value;
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
