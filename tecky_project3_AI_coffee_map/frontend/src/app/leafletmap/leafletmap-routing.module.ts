import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeafletmapPage } from './leafletmap.page';

const routes: Routes = [
  {
    path: '',
    component: LeafletmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeafletmapPageRoutingModule {}
