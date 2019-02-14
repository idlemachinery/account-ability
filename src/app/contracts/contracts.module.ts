import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ContractsRoutingModule } from './contracts-routing.module';

@NgModule({
  imports: [ContractsRoutingModule, SharedModule],
  declarations: [ContractsRoutingModule.components]
})
export class ContractsModule {}
