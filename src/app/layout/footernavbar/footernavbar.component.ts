import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footernavbar',
  templateUrl: './footernavbar.component.html'
})
export class FooternavbarComponent implements OnInit {

  public anoI = '2008';
  public anoF = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
