import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { ShopService } from '../shop.service';
import { tap } from 'rxjs/operators';
import { timeStamp } from 'console';

@Component({
  selector: 'app-leafletmap',
  templateUrl: './leafletmap.page.html',
  styleUrls: ['./leafletmap.page.scss'],
})
export class LeafletmapPage implements OnInit {
  @Input()
  center: L.LatLngTuple = [22.32084108197894, 114.20875765828758]; //hard code 現在位置

  //new add 一開始係空
  nearbyMarkers: L.Marker[] = [];

  queryParamsTap$ = this.activatedRoute.queryParams.pipe(
    tap((query) => {
      let { lat, lng } = query;
      if (lat && lng) {
        this.setCenter([lat, lng]);
      }
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private shopService: ShopService
  ) {}

  map?: L.Map;
  marker?: L.Marker;
  ngOnInit(): void {}
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
      //.center = 中心點
      this.marker = L.marker(this.center);
      this.marker.addTo(this.map);
      // this.map.addEventListener('move', () => {
      // console.log('moved');
      // this.searchByLocation();
      // });
      this.map.addEventListener('dragend', () => {
        console.log('dragend');
        //keep search when mouse dragend
        this.searchByLocation();
      });
    }
    this.setCenter(this.center);
    this.getCurrentLocation();
  }

  gettingCurrentLocation = false;
  getCurrentLocation() {
    this.gettingCurrentLocation = true;
    navigator.geolocation.getCurrentPosition((position) => {
      this.gettingCurrentLocation = false;
      this.setCenter([position.coords.latitude, position.coords.longitude]);
    });
  }

  setCenter(center: [number, number]) {
    this.center = center;
    this.updateCenter();
  }

  updateCenter() {
    this.map?.setView(this.center, 18);
    this.marker?.setLatLng(this.center);
    this.searchByLocation();
  }
  //loop 住攞資料
  async searchByLocation() {
    const map = this.map;
    if (!map) return;
    // shop/by-location?lat=114&lng=22
    let center = map.getCenter();
    if (center) {
      //findByLocation refer to shop.service.ts
      let json = await this.shopService.findByLocation(center);
      console.log(json.shops);

      //for-loop: check nearbyMarkers 有無野, 有就remove
      for (let marker of this.nearbyMarkers) {
        marker.remove();
      }

      //for-loop: check nearbyMarkers 有無野, 無就新array
      this.nearbyMarkers = [];

      //continuous the below loop
      for (let shop of json.shops) {
        //L.marker = {x: ..., y:...}
        let marker = L.marker({
          lat: shop.latlng.x,
          lng: shop.latlng.y,
        });
        //then add to map
        marker.addTo(map);
        //then push
        this.nearbyMarkers.push(marker);
      }
    }
  }
}
