import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AiSearchResultPageRoutingModule } from './ai-search-result-routing.module';

import { AiSearchResultPage } from './ai-search-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AiSearchResultPageRoutingModule
  ],
  declarations: [AiSearchResultPage]
})
export class AiSearchResultPageModule {}
