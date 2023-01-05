import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AiScanPage } from './ai-scan.page';

const routes: Routes = [
  {
    path: '',
    component: AiScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiScanPageRoutingModule {}
