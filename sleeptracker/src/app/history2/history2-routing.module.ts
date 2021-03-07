import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { History2Page } from './history2.page';

const routes: Routes = [
  {
    path: '',
    component: History2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class History2PageRoutingModule {}
