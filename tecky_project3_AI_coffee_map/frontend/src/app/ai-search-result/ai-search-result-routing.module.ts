import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AiSearchResultPage } from './ai-search-result.page';

const routes: Routes = [
  {
    path: '',
    component: AiSearchResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiSearchResultPageRoutingModule {}
