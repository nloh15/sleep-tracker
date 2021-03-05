
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

	// Initialize time
	currentTime:string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second:'2-digit' });

	constructor(public sleepService:SleepService, private route: Router) {
	}

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
	
	/*
	ngOnInit() {
		
	}*/

	updateTime() {
		// Get current date and format to get current time
		var date = new Date();
		this.currentTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
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
}
