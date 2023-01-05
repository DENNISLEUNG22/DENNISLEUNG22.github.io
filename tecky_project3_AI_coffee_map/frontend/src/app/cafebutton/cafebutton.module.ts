import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CafebuttonPageRoutingModule } from './cafebutton-routing.module';

import { CafebuttonPage } from './cafebutton.page';

import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [
    SwiperModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CafebuttonPageRoutingModule,
  ],
  declarations: [CafebuttonPage],
})
export class CafebuttonPageModule {}
