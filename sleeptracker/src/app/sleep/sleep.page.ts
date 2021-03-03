import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { Router } from '@angular/router';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.page.html',
  styleUrls: ['./sleep.page.scss'],
})
export class SleepPage implements OnInit {
  sleepStr:OvernightSleepData[];
  sleepTime:Date = new Date();
  wakeTime:Date = new Date();

  constructor(public sleepService:SleepService, private route: Router, public modalController: ModalController) { }

  
  ngOnInit() {
    this.sleepStr = SleepService.AllOvernightData;
  }

  get allSleepData() {
		return SleepService.AllSleepData;
  }
  
  logdata(){
    let sleepData: OvernightSleepData = new OvernightSleepData(this.sleepTime, this.wakeTime);
    this.sleepService.logOvernightData(sleepData);
    console.log(this.allSleepData);
  }

  
  
  
}
