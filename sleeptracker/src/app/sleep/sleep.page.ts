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

  
  ngOnInit() {
  }

  get allSleepData() {
		return SleepService.AllSleepData;
  }
  
  logdata(){
    let sleepData: OvernightSleepData = new OvernightSleepData(this.sleepTime, this.wakeTime);
    this.sleepService.logOvernightData(sleepData);
    this.presentToast();
    this.route.navigate(['/home']);
    console.log(this.allSleepData);
  }

  
  
  
}
