import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ContractListResolved } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ContractsResolver implements Resolve<ContractListResolved> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContractListResolved> {
    return this.dataService.getContracts()
      .pipe(
        map(contracts => ({ contracts: contracts})),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(error);
          return of({contracts: null, error: message });
        })
      );
  }
}
