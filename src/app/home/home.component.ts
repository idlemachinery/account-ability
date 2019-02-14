import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public images = [];
  public stepComplete = 0;
  @ViewChild('imgCarousel') imgCarousel: any;
  @ViewChild('acc') acc: NgbAccordion;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.images = this.dataService.getImages();
  }

  prev() {
    this.imgCarousel.prev();
  }

  next() {
    this.imgCarousel.next();
  }

  nextButton(step) {
    this.stepComplete = step;
    const nextPanel = `panel-${this.stepComplete + 1}`;
    this.acc.toggle(nextPanel);
  }

  beforeChange($event) {
    const split = $event.panelId.split('-');
    const curStep = +split[1];
    if (this.stepComplete < curStep - 1) {
      $event.preventDefault();
    }
  }
}
