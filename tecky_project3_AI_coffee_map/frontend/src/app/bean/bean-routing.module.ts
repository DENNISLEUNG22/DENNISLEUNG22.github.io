import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeanPage } from './bean.page';

const routes: Routes = [
  {
    path: '',
    component: BeanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeanPageRoutingModule {}
