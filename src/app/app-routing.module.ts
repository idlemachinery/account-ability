import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contracts/:id', loadChildren: 'src/app/contract/contract.module#ContractModule' },
  { path: 'contracts', loadChildren: 'src/app/contracts/contracts.module#ContractsModule' },
  { path: 'admin', loadChildren: 'src/app/admin/admin.module#AdminModule' },
  { path: '**', pathMatch: 'full', redirectTo: '' } // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [HomeComponent];
 }
