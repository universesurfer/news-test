import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from "angular2-google-maps/core"; //Angular 2 Google Maps

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCLmODzvt82lNOv-p_JpvPoLqk8nME9kCA"})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
