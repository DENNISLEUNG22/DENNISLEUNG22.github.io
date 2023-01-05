import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeafletmapPageRoutingModule } from './leafletmap-routing.module';

import { LeafletmapPage } from './leafletmap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeafletmapPageRoutingModule
  ],
  declarations: [LeafletmapPage]
})
export class LeafletmapPageModule {}
