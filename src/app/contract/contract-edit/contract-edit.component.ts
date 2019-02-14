import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { Contract, ContractResolved } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContractEditComponent implements OnInit {
  pageTitle = 'Edit';
  errorMessage: string;
  private dataIsValid: { [key: string]: boolean } = {};
  @ViewChild('deactivateModal') deactivateModal: any;

  get isDirty(): boolean {
    return JSON.stringify(this.originalContract) !== JSON.stringify(this.currentContract);
  }

  private currentContract: Contract;
  private originalContract: Contract;

  get contract(): Contract {
    return this.currentContract;
  }
  set contract(value: Contract) {
    this.currentContract = value;
    // Clone the original Contract to make a copy
    this.originalContract = { ...value };
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: DataService,
    private modal: NgbModal
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData: ContractResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onContractRetrieved(resolvedData.contract);
    });
  }

  onContractRetrieved(contract: Contract): void {
    this.contract = contract;

    if (!this.contract) {
      this.pageTitle = 'No contract found';
    } else {
      if (this.contract.id === 0) {
        this.pageTitle = 'Add Accountability Contract';
      } else {
        this.pageTitle = `Edit Accountability Contract`;
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (
      this.dataIsValid && Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true)
    );
  }

  reset(): void {
    this.dataIsValid = null;
    this.currentContract = null;
    this.originalContract = null;
  }

  save(): void {
    if (this.isValid()) {
      this.api.saveContract(this.contract).subscribe(
        data => {
          this.onSaveComplete();
        },
        (error: any) => (this.errorMessage = <any>error)
      );
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Navigate back to the product list
    this.reset();
    this.router.navigate(['/contracts']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.contract.taskName && this.contract.taskName.length >= 3 && this.contract.owner) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'form' tab
    if (this.contract.define && this.contract.define.length >= 3) {
      this.dataIsValid['form'] = true;
    } else {
      this.dataIsValid['form'] = false;
    }

    // 'post' tab
    this.dataIsValid['post'] = true;
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.isDirty) {
      return true;
    }
    // Dirty show display modal dialog to user to confirm leaving
    const options: NgbModalOptions = { size: 'sm' };
    return this.modal.open(this.deactivateModal).result.then(result => true, reason => false);
  }
}
