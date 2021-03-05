
import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core'; 
const { LocalNotifications } = Plugins;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	allData: SleepData[];
	mostRecentHistory: Array<String>[];

	constructor(public sleepService:SleepService, private route: Router) {
	}

	ngOnInit() {
		this.allData = this.allSleepData;
		this.mostRecentHistory = this.recentHistory;
	async ngOnInit() {

		console.log(this.allSleepData);

		// Update time each second
		setInterval(() => { this.updateTime();}, 1000);

 		await LocalNotifications.requestPermission();

 		const notifs = await LocalNotifications.schedule({
		 notifications: [
		 {
		 title: "Sleep Tracker",
		 body: "Don't forget to log your sleep times! ",
		 id: 1,
		 schedule: { at: new Date(Date.now() + 1000 * 5)
		},
		 sound: null,
		 attachments: null,
		 actionTypeId: ""
		,
		 extra: null
		 }
		 ]
		});
		console.log('scheduled notifications', notifs);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	toSleepPage() {
    	this.route.navigate(['/sleep']);
  	}

  	toSleepinessPage() {
    	this.route.navigate(['/sleepiness']);
  	}

  	toHistoryPage() {
    	this.route.navigate(['/history']);
  	}

  	options = {
    	slidesPerView: 1.3,
  	}

  	get recentHistory(){
  		var currentRecentHistory = [];

  		for (var i in this.allData) {
  			var currentData = this.allData[i];
  			var dataType = currentData.constructor.name;

  			if (dataType == "OvernightSleepData") {
  				currentRecentHistory.push(["Sleep Log", currentData]);
  			}
  			else if (dataType == "StanfordSleepinessData") {
  				currentRecentHistory.push(["Sleepiness Log", currentData]);
  			}
  		}
  		return currentRecentHistory;
  	}
}
