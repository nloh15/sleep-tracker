import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { History2PageRoutingModule } from './history2-routing.module';

import { History2Page } from './history2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    History2PageRoutingModule
  ],
  declarations: [History2Page]
})
export class History2PageModule {}
