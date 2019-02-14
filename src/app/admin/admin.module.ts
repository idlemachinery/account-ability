import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [AdminRoutingModule, SharedModule],
  declarations: [AdminRoutingModule.components, AdminComponent]
})
export class AdminModule { }
