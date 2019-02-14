import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ContractResolved } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';
import { LoggerService } from '../core/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class ContractResolver implements Resolve<ContractResolved> {

  constructor(private dataService: DataService,
              private logger: LoggerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContractResolved> {
    let id = route.paramMap.get('id');
    if (id === 'new') {
      id = '0';
    } else if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      this.logger.log(message);
      return of({ contract: null, error: message });
    }
    return this.dataService.getContract(+id)
    .pipe(
      map(contract => ({ contract: contract })),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(error);
        return of({ contract: null, error: message });
      })
    );
  }
}
