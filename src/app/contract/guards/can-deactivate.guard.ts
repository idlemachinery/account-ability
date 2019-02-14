import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { LoggerService } from '../../core/services/logger.service';
import { ContractEditComponent } from '../contract-edit/contract-edit.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ContractEditComponent> {

  constructor(private logger: LoggerService) {}

  canDeactivate(
    component: ContractEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.logger.log(`ContractId: ${route.parent.params['id']} URL: ${state.url}`);

    // Check with component to see if we're able to deactivate
    const result = component.canDeactivate();
    return result;
  }
}
