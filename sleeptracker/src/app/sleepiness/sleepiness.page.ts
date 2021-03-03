import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {

	level:number = 0;
	lastRecorded:number = 0;


	constructor(private sleepService:SleepService, private route: Router) { }
	ngOnInit() { }

  	// Record value once user prompts
  	recordValue(){
  		// Create new data of type StanfordSleepinessData and add to 
		this.sleepService.logSleepinessData(new StanfordSleepinessData(this.level, new Date()));
		console.log(this.allSleepData);

		// Go back to home page and display modal to confirm success
		this.route.navigate(['/home']);

		/* TO DO DISPLAY MODAL TO CONFIRM SUCCESS */

	}

	get allSleepData() {
		return SleepService.AllSleepData;
	}


}
