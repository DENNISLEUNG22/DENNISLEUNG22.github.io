import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bean',
  templateUrl: './bean.page.html',
  styleUrls: ['./bean.page.scss'],
})
export class BeanPage implements OnInit {
  ngOnInit() {}
  constructor(private activatedRoute: ActivatedRoute) {}

  CafeSSS = [
    {
      id: 1054,
      name: 'Knockbox Coffee Company',
      address: [22.3177443, 114.1725229],
      bean: 'Lavazza-Qualita Oro',
    },
    {
      id: 1055,
      name: 'Rim Coffee',
      address: [22.3119559, 114.1877776],
      bean: 'Lavazza-Qualita Oro Mountain Grown',
    },
    {
      id: 1056,
      name: '% Arabica (IFC)',
      address: [22.2862696, 114.1577309],
      bean: 'UCC-The Blend 117',
    },
    {
      id: 1057,
      name: 'UCC Vienna Café',
      address: [22.3087459, 114.1910976],
      bean: 'illy Coffee-Classic roast',
    },
    {
      id: 1058,
      name: 'Until coffee',
      address: [22.338325, 114.1981629],
      bean: 'illy Coffee-Bold Roast',
    },
    {
      id: 1060,
      name: 'Black Sugar Coffee & Lifestyle',
      address: [22.3193087, 114.1735982],
      bean: 'Starbucks-Caffe Latte',
    },
    {
      id: 1061,
      name: '尖東咖啡店',
      address: [22.299347, 114.1770507],
      bean: 'Starbucks-Signature Chocolate',
    },
    {
      id: 1062,
      name: 'Hazel & Hershey Coffee Roasters',
      address: [22.2821528, 114.1519694],
      bean: 'Bushells Coffee-Classic',
    },
  ];
}
