import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  beforeChange($event) {
    console.log('before tab change', $event);
    if ($event.nextId === 'tabImages') {
      // $event.preventDefault();
    }
  }
}
