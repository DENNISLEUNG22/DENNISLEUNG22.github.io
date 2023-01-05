import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type Tab = {
  icon: string;
  name: string;
  href?: string;
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRoute.url.subscribe((url: any) => {
      let page = location.pathname;
      this.activeTab =
        this.tabs.find((tab) => tab.href == page) || this.activeTab;
    });
  }

  //暫時不能多過5個／少過5個tab （css 問題）
  tabs: Tab[] = [
    { icon: 'home-outline', name: 'Home', href: '/home' },
    { icon: 'cafe-outline', name: 'Profile', href: '/shop/:id' },
    { icon: 'navigate-outline', name: 'Map', href: '/leafletmap' },
    { icon: 'camera-outline', name: 'Bean?', href: '/ai-scan' },
    { icon: 'settings-outline', name: 'Setting', href: '/setting' },
  ];

  activeTab: Tab = this.tabs[0];

  selectTab(tab: Tab) {
    this.activeTab = tab;
  }
}
