import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeishmaniosePage } from './leishmaniose.page';

const routes: Routes = [
  {
    path: '',
    component: LeishmaniosePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeishmaniosePage]
})
export class LeishmaniosePageModule {}
