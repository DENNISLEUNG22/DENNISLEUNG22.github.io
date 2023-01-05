import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscribable, Subscription, timer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.page.html',
  styleUrls: ['./shop-detail.page.scss'],
})
export class ShopDetailPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute // private shopService: ShopService, // private router: Router, // private toastCtl: ToastController
  ) {}

  ngOnInit(): void {
    this.getStoreData();
  }

  shops = [
    {
      id: 1,
      name: '',
      start_time: '',
      end_time: '',
      address: '',
    },
  ];

  async getStoreData() {
    let res = await fetch('http://localhost:8080/shopData');
    let result = await res.json();

    // console.log(result);

    const nameArr = result.data.map((v: any) => {
      return {
        ...v,
        // name: v.address.split(' ')[0] + ' Shop',
        id: v.id,
        name: v.name,
        address: v.address,
        start_time: v.start_time,
        end_time: v.end_time,
      };
    });

    this.shops = nameArr;
  }
}
// ----------------------------beeno example------------------------------------
//   ngOnInit() {
//     console.log(this.id$);
//     this.activatedRoute.params.subscribe(async (params) => {
//       this.shop = await this.shopService.getShopDetail(+params['id']);
//     });
//   }
//   ngOnDestroy(): void {
//     this.sub?.unsubscribe();
//     delete this.sub;
//   }
//   id$ = this.activatedRoute.params.pipe(map((params) => +params['id']));

//   shop$ = this.id$.pipe(mergeMap((id) => this.shopService.getShopDetail(id)));

//  as = ['a'];
//   apples = this.as.map((a) => a + 'pple');

//   // fruits = this.as.flatMap((a) => [a + 1, a + 2, a + 3]);
//  clock = timer(0, 1000);

//   sessionTimeout = timer(5 * 1000).pipe(
//     mergeMap(() => {
//       let timeout = setTimeout(() => {
//         console.log('auto logout');
//       }, 7000);
//       return this.toastCtl
//         .create({
//           message: 'are you still here?',
//           duration: 7000,
//           color: 'warning',
//           buttons: [
//             {
//               text: 'Yes',
//               role: 'cancel',
//               handler: () => clearTimeout(timeout),
//             },
//           ],
//         })
//         .then((toast) => toast.present());
//       // return this.router.navigateByUrl('/login');
//     })
//   );
