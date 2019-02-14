import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Third party imports
import { NgbDateAdapter, NgbTimeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Toastr, TOASTR_TOKEN } from './services/toastr.service';
const toastr: Toastr = window['toastr'];

import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { AddHeaderInterceptor } from './interceptors/add-header.interceptor';
import { DateStringAdapterService } from './services/date-string-adapter.service';
import { TimeStringAdapterService } from './services/time-string-adapter.service';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, NgbModule],
  exports: [RouterModule, HttpClientModule, NavMenuComponent, FooterComponent],
  declarations: [NavMenuComponent, FooterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    },
    { provide: NgbDateAdapter, useClass: DateStringAdapterService },
    { provide: NgbTimeAdapter, useClass: TimeStringAdapterService },
    { provide: TOASTR_TOKEN, useValue: toastr}
  ] // these should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
