import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,     // Main routes for application
    CoreModule,           // Singleton objects (services, components that are loaded only once, etc.)
    SharedModule,         // Shared (multi-instance) objects
  ],
  declarations: [AppComponent, AppRoutingModule.components],
  bootstrap: [AppComponent]
})
export class AppModule { }
