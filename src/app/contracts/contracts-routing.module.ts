import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractsComponent } from './contracts.component';
import { ContractsResolver } from './contracts-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ContractsComponent,
    resolve: { resolvedData: ContractsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule {
  static components = [ContractsComponent];
}
