import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ContractRoutingModule } from './contract-routing.module';

@NgModule({
  imports: [ContractRoutingModule, SharedModule],
  declarations: [ContractRoutingModule.components]
})
export class ContractModule {}
