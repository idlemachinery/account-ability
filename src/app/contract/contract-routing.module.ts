import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { ContractResolver } from './contract-resolver.service';
import { ContractEditComponent } from './contract-edit/contract-edit.component';
import { ContractEditInfoComponent } from './contract-edit/contract-edit-info.component';
import { ContractEditFormComponent } from './contract-edit/contract-edit-form.component';
import { ContractEditPostComponent } from './contract-edit/contract-edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: ContractEditComponent,
    canDeactivate: [CanDeactivateGuard],
    resolve: { resolvedData: ContractResolver },
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: ContractEditInfoComponent },
      { path: 'form', component: ContractEditFormComponent },
      { path: 'post', component: ContractEditPostComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard]
})
export class ContractRoutingModule {
  static components = [ContractEditComponent, ContractEditInfoComponent, ContractEditFormComponent, ContractEditPostComponent];
}
