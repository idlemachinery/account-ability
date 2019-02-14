import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import { SortableHeaderDirective, SortEvent, compare } from '../shared/directives/sortable-header.directive';
import { Contract, ContractListResolved } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';
import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'im-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  contractsSorted: Contract[] = [];
  contractsOrig: Contract[] = [];
  totals = {};
  collectionSize = 0;
  pageSize = 5;
  page = 1;
  errorMessage = '';

  get contracts(): Contract[] {
    return this.contractsSorted
      .map((contract, i) => ({id: i + 1, ...contract}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  constructor(
    private api: DataService,
    private logger: LoggerService,
    private route: ActivatedRoute,
    private modal: NgbModal) { }

  ngOnInit() {
    const resolvedData: ContractListResolved = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    if (resolvedData.contracts) {
      this.contractsOrig = _.orderBy(resolvedData.contracts, ['createdDateTime'], ['desc']);
      this.refresh();
    }
  }

  refresh() {
    this.contractsSorted = this.contractsOrig;
    this.collectionSize = this.contractsSorted.length;
    this.calculateTotals();
  }

  deleteContract(id: number, deleteModal) {
    const options: NgbModalOptions = { size: 'sm' };
    this.modal.open(deleteModal, options).result.then(result => {
      this.api.deleteContract(id).subscribe(data => {
        _.remove(this.contractsOrig, { id: id });
        this.refresh();
      });
    }, reason => console.log(`Dismissed: ${reason}`));
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting contracts
    if (direction === '') {
      this.contractsSorted = this.contractsOrig;
    } else {
      this.contractsSorted = [...this.contractsOrig].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  calculateTotals() {
    const ongoingTotal = _.chain(this.contractsSorted).filter(x => x.status === 'ongoing').value().length;
    const completeTotal = _.chain(this.contractsSorted).filter(x => x.status === 'complete').value().length;
    const incompleteTotal = _.chain(this.contractsSorted).filter(x => x.status === 'incomplete').value().length;
    this.totals = {
      ongoing: ongoingTotal,
      complete: completeTotal,
      incomplete: incompleteTotal,
      total: this.collectionSize
    };
  }
}
