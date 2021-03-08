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
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.sleepinessLevelDate,
        datasets: [{
          label: 'Average Sleepiness Level',
          data: this.averageSleepinessLevelPerDay,
          backgroundColor: 'rgb(38, 194, 129, 0)',
          borderColor: '#6391c3',
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
    var dateToAverageSleepiness = new Map;

    for (var i in this.sleepinessArray) {
      var currentSleepinessData = this.sleepinessArray[i];
      var level = currentSleepinessData.sleepinessLevel();
      currentSleepHistory.push(level);
      var sleepinessDate = currentSleepinessData.loggedAt.toLocaleDateString('en-US', {month: 'short', day: 'numeric' })

      if (dateToAverageSleepiness.has(sleepinessDate)){
        var averageData = dateToAverageSleepiness.get(sleepinessDate);
        var count = averageData[0] + 1;
        var total = averageData[1] + level;
        dateToAverageSleepiness.set(sleepinessDate, [count, total]);
      }
      else {
        dateToAverageSleepiness.set(sleepinessDate, [1, level]);
      }
    }
    return dateToAverageSleepiness;
  }

  get sleepinessLevelDate(){
    var sleepyMap = this.formatSleepinessLevel;
    let keys = Array.from( sleepyMap.keys() );
    return keys;
  }

  get averageSleepinessLevelPerDay(){

    var dateKeys = this.sleepinessLevelDate;
    var dateMaps = this.formatSleepinessLevel;
    var dateAverages = [];
    for (var i = 0; i < dateKeys.length; i++){
      var data = dateMaps.get(dateKeys[i]);
      console.log(data);
      var count = data[0];
      var total = data[1];
      dateAverages.push(total/count);
    }
    return dateAverages;
  }


}
