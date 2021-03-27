import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    console.log('TabsPage onInit');
  }

  ngOnDestroy() {
    console.log('TabsPage onDestroy');
  }
}
