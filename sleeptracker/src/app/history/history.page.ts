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

  constructor() { }

  ngOnInit() {
    this.sleepArray = SleepService.AllOvernightData;
    this.sleepinessArray = SleepService.AllSleepinessData;
  }

}
