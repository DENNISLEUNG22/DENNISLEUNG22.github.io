import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { LeafletmapPage } from '../leafletmap/leafletmap.page';

type Icon = {
  icon: string;
  name: string;
  href?: string;
};
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // <!-- ------------下面係--Home page Leaflet-------------------- -->

  // lat = 0;
  // lon = 0;
  // center: L.LatLngTuple = [this.lan, this.lon];
  center: L.LatLngTuple = [22.32084108197894, 114.20875765828758]; //hard code 現在位置

  constructor(private router: ActivatedRoute, private elementRef: ElementRef) {}
  map?: L.Map;
  marker?: L.Marker;
  ngOnInit(): void {
    this.getStoreData();
  }

  // shops = [
  //   {
  //     id: 1,
  //     name: 'Espresso Alchemy',
  //     address:
  //       'Shop G104, G/F, Gateway Arcade, 海港城25 Canton Rd, Tsim Sha Tsui',
  //   },
  //   {
  //     id: 2,
  //     name: 'UCC Vienna Café',
  //     address: '紅磡海逸道8號海逸坊 高層地面, UG26-28號舖',
  //   },
  //   {
  //     id: 3,
  //     name: 'Rim Coffee',
  //     address: 'The Vantage, Shop 104, 1/F, 63 Ma Tau Wai Rd, Hung Hom',
  //   },
  //   {
  //     id: 4,
  //     name: 'Until coffee',
  //     address: 'G/F, 1 Sheung Hei street San Po Kong, Diamond Hill',
  //   },
  // ];

  shops = [
    {
      id: 1,
      name: '您睇到呢個，db已經死左',
      color: 'primary',
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

        name: v.name,
        address: v.address,
        color: this.getRandomColor(),
      };
    });

    this.shops = nameArr;
  }

  ionViewDidEnter() {
    if (!this.map) {
      let container =
        this.elementRef.nativeElement.querySelector('.map-container');
      this.map = L.map(container);
      this.map.fitWorld();
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 8,
      }).addTo(this.map);
      this.marker = L.marker(this.center);
      this.marker.addTo(this.map);
    }
    this.updateCenter();
    this.getCurrentLocation();
  }

  gettingCurrentLocation = false;
  getCurrentLocation() {
    this.gettingCurrentLocation = true;
    navigator.geolocation.getCurrentPosition((position) => {
      this.center[0] = position.coords.latitude;
      this.center[1] = position.coords.longitude;
      this.gettingCurrentLocation = false;
      this.updateCenter();
    });
  }

  updateCenter() {
    this.map?.setView(this.center, 18);
    this.marker?.setLatLng(this.center);
  }
  // <!-- ------------上面係--Home page Leaflet-------------------- -->
  // <!-- ------------下面係--button of '睇 買 台 工'-------------------- -->
  routeIcon: Icon[] = [
    { icon: 'eye-outline', name: '睇', href: '/home' },
    { icon: 'cart-outline', name: '買', href: '/home' },
    { icon: 'pricetag-outline', name: '店', href: '/home' },
    { icon: 'git-network-outline', name: '工', href: '/home' },
  ];
  // <!-- ------------上面係--button of '睇 買 台 工'-------------------- -->
  // <!-- ------------下面係--轉random color-------------------- -->

  // <!-- ------------上面係--轉random color-------------------- -->
  // <!-- ------------下面係--newCafePush-------------------- -->

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  // newCafePush = [
  //   { icon: 'eye-outline', name: '睇', href: '/home' },
  //   { icon: 'cart-outline', name: '買', href: '/home' },
  //   { icon: 'pricetag-outline', name: '店', href: '/home' },
  //   { icon: 'git-network-outline', name: '工', href: '/home' },
  //   { icon: 'eye-outline', name: '睇', href: '/home' },
  //   { icon: 'cart-outline', name: '買', href: '/home' },
  //   { icon: 'pricetag-outline', name: '店', href: '/home' },
  //   { icon: 'git-network-outline', name: '工', href: '/home' },
  // ];
}
