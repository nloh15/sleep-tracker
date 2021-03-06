import { Component, OnInit,ViewChild } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  @ViewChild('barChart') barChart;  
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



}
