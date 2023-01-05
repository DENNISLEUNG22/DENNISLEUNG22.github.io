import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./setting/setting.module').then((m) => m.SettingPageModule),
  },
  {
    path: 'ai-scan',
    loadChildren: () =>
      import('./ai-scan/ai-scan.module').then((m) => m.AiScanPageModule),
  },

  {
    // path: 'leafletmap/:title/:lat/:lon',
    path: 'leafletmap',
    loadChildren: () =>
      import('./leafletmap/leafletmap.module').then(
        (m) => m.LeafletmapPageModule
      ),
  },
  {
    path: 'shop/:id',
    loadChildren: () =>
      import('./shop-detail/shop-detail.module').then(
        (m) => m.ShopDetailPageModule
      ),
  },
  {
    path: 'ai-search-result/:id',
    loadChildren: () =>
      import('./ai-search-result/ai-search-result.module').then(
        (m) => m.AiSearchResultPageModule
      ),
  },
  {
    path: 'cafebutton',
    loadChildren: () =>
      import('./cafebutton/cafebutton.module').then(
        (m) => m.CafebuttonPageModule
      ),
  },
  {
    path: 'bean/:id',
    loadChildren: () =>
      import('./bean/bean.module').then((m) => m.BeanPageModule),
  },

  //new add by Sylvia
  // {
  //   path: 'leafletmap/shop:/id',
  //   loadChildren: () =>
  //     import('./leafletmap/shop/leafletmap.module').then(
  //       (m) => m.LeafletmapShopDetailsModule
  //     ),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
