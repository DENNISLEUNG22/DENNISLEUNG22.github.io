import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CafebuttonPage } from './cafebutton.page';

const routes: Routes = [
  {
    path: '',
    component: CafebuttonPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CafebuttonPageRoutingModule {}
