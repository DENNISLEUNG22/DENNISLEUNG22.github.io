import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeanPageRoutingModule } from './bean-routing.module';

import { BeanPage } from './bean.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeanPageRoutingModule
  ],
  declarations: [BeanPage]
})
export class BeanPageModule {}
