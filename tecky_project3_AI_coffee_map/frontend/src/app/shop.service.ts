import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ShopDetail } from './shop-detail';

@Injectable({
  providedIn: 'root',
})

//new add
export class ShopService {
  constructor(private api: ApiService) {}

  getShopDetail(id: number) {
    return new Promise<ShopDetail>((resolve) => {
      setTimeout(() => {
        resolve({ id: id, name: 'fake name' });
      }, 1000);
    });
  }

  //new add
  findByLocation(position: { lat: number; lng: number }) {
    return this.api.get('/shop/by-location', position);
  }
}
