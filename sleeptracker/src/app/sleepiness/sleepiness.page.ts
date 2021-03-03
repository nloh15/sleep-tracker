import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Router } from '@angular/router';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {

	level:number = 0;
	lastRecorded:number = 0;


	constructor(private sleepService:SleepService) { }
	ngOnInit() {}

	updateValue() {
		this.lastRecorded = this.level;
  	}


  	// Record value once user prompts
  	recordValue(){
  		// Create new data of type StanfordSleepinessData and add to 
		this.sleepService.logSleepinessData(new StanfordSleepinessData(this.lastRecorded, new Date()));
		console.log(this.allSleepData);
	}
	
	get allSleepData() {
		return SleepService.AllSleepData;
	}


}
