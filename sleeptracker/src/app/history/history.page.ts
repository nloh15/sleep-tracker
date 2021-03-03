import { Component, OnInit } from '@angular/core';
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
  sleepArray: OvernightSleepData[];
  sleepinessArray: StanfordSleepinessData[];
  sleepHistory: Array<String>[];
  sleepinessHistory: Array<String>[];

  constructor(public sleepService:SleepService) { }

  ngOnInit() {
    this.sleepArray = this.allOvernightData;
    this.sleepinessArray = this.allSleepinessData;
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

}
