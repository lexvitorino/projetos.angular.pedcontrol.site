import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit, OnDestroy {

  constructor(
  ) {
  }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-red sidebar-mini fixed';
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
