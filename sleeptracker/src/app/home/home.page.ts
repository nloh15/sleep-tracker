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
  currentTime:string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});

	constructor(public sleepService:SleepService, private route: Router) {
	}

	async ngOnInit() {
		console.log("page init");
    setInterval(() => { this.updateTime()}, 1000*60);
 		await LocalNotifications.requestPermission();

    var now  = new Date();
    // Set notifications to 9 AM
    now.setDate(now.getDate() + 1)
    now.setHours(9);
    now.setMinutes(0);
    now.setMilliseconds(0);

 		const notifs = await LocalNotifications.schedule({
		 notifications: [
		 {
		 title: "Sleep Tracker",
		 body: "Don't forget to log your sleep times! ",
		 id: 1,
		 schedule: { at: now
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

    toHistory2Page() {
      this.route.navigate(['/history2']);
    }

  	options = {
    	slidesPerView: 1.3,
  	}

  	get recentHistory(){
  		var currentRecentHistory = [];
  		var count = 0;

  		// Reverse list to get most recent

  		var dataArray = this.allSleepData;
  		console.log(dataArray);
  		//dataArray.reverse();
  		for (var i in dataArray) {
  			var currentData = dataArray[i];
  			var dataType = currentData.constructor.name;
  			if (count >= 10) {
  				break;
  			}

  			if (dataType == "OvernightSleepData") {
  				currentRecentHistory.push(["Sleep Log", currentData]);
  				count++;
  			}
  			else if (dataType == "StanfordSleepinessData") {
  				currentRecentHistory.push(["Sleepiness Log", currentData]);
  				count++;
  			}
  		}

  		return currentRecentHistory;
  	}

    updateTime() {
    // Get current date and format to get current time
    var date = new Date();
    this.currentTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}
