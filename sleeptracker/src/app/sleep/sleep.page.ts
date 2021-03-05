import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { Router } from '@angular/router';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';


import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.page.html',
  styleUrls: ['./sleep.page.scss'],
})
export class SleepPage implements OnInit {
  sleepStr:OvernightSleepData[];
  sleepTime:Date;
  wakeTime:Date;

  constructor(public sleepService:SleepService, private route: Router, public toastController: ToastController) { }

  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your daily log has been saved.',
      duration: 2000
    });
    toast.present();
  }

  async timeToast() {
    const toast = await this.toastController.create({
      message: 'Please check the inputted time. Sleep time should be earlier than Wake time.',
      duration: 2000
    });
    toast.present();
  }

  async timeoutToast() {
    const toast = await this.toastController.create({
      message: 'Please check the inputted time. Sleep duration is over 24 hours',
      duration: 2000
    });
    toast.present();
  }
  
  ngOnInit() {
  }

  get allSleepData() {
		return SleepService.AllSleepData;
  }
  
  logdata(){
    let sleepData: OvernightSleepData = new OvernightSleepData(this.sleepTime, this.wakeTime);

    var startTime = new Date(this.sleepTime);
    var sleepStart_ms = startTime.getTime();
    var endTime = new Date(this.wakeTime);
    var sleepEnd_ms = endTime.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = sleepEnd_ms - sleepStart_ms;


    if(this.sleepTime > this.wakeTime){
      this.timeToast();

    }
    else if( difference_ms > 86400000){
      this.timeoutToast();
    }
    else{
    this.sleepService.logOvernightData(sleepData);
    this.presentToast();
    this.route.navigate(['/home']);
    }
    console.log(this.allSleepData);
  }

  
  
  
}
