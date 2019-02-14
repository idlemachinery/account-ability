import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Contract } from 'src/app/shared/interfaces';

@Component({
  templateUrl: './contract-edit-info.component.html'
})
export class ContractEditInfoComponent implements OnInit {
  @ViewChild(NgForm) contractForm: NgForm;
  errorMessage: string;
  contract: Contract;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if (this.contractForm) {
        this.contractForm.reset();
      }
      this.contract = data['resolvedData'].contract;
    });
  }
}
