import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ SidebarModule} from 'primeng/sidebar'
import {ButtonModule} from 'primeng/button'
import {ListboxModule} from 'primeng/listbox'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    ListboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
