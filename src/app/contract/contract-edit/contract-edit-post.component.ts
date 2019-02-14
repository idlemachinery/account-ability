import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Contract } from 'src/app/shared/interfaces';

@Component({
  templateUrl: './contract-edit-post.component.html'
})
export class ContractEditPostComponent implements OnInit {
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

  clearQuality() {
    if (this.contract.quality !== null && this.contract.quality !== 0) {
      this.contract.quality = null;
      this.changeRate();
    }
  }

  changeRate() {
    this.contractForm.form.markAsDirty();
  }
}
