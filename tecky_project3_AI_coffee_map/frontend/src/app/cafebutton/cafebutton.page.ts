import { Component, OnInit } from '@angular/core';
// import { SwiperComponent } from 'swiper/angular';
// import SwiperCore, { Pagination, Navigation } from 'swiper/core';
@Component({
  selector: 'app-cafebutton',
  templateUrl: './cafebutton.page.html',
  styleUrls: ['./cafebutton.page.scss'],
})

// SwiperCore.use([Pagination, Navigation]);
export class CafebuttonPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  // @ViewChild('swiperRef', { static: false }) sliderRef?: SwiperComponent;

  // appendNumber = 4;
  // prependNumber = 1;

  // prepend() {
  //   this.sliderRef.swiperRef.prependSlide(
  //     '<div class="swiper-slide">Slide ' + --this.prependNumber + '</div>'
  //   );
  // }

  // prepend2() {
  //   this.sliderRef.swiperRef.prependSlide([
  //     '<div class="swiper-slide">Slide ' + --this.prependNumber + '</div>',
  //     '<div class="swiper-slide">Slide ' + --this.prependNumber + '</div>',
  //   ]);
  // }

  // append() {
  //   this.sliderRef.swiperRef.appendSlide(
  //     '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>'
  //   );
  // }

  // append2() {
  //   this.sliderRef.swiperRef.appendSlide([
  //     '<div class="swiper-slide">Slide ' + ++this.appendNumber + '</div>',
  //     '<div class="swiper-slide">Slide ' + ++this.appendNumber + '</div>',
  //   ]);
  // }
}
