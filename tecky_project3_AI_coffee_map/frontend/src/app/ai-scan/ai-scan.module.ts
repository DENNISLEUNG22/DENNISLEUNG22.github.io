import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AiScanPageRoutingModule } from './ai-scan-routing.module';

import { AiScanPage } from './ai-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AiScanPageRoutingModule
  ],
  declarations: [AiScanPage]
})
export class AiScanPageModule {}
