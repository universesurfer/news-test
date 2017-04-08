import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './route/app.routing';
import { RouterModule } from "@angular/router";
import { AmChartsModule } from "amcharts3-angular2";

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
// import { AgmCoreModule } from "angular2-google-maps/core"; //Angular 2 Google Maps


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AmChartsModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  //   AgmCoreModule.forRoot({
  //     apiKey: "AIzaSyCLmODzvt82lNOv-p_JpvPoLqk8nME9kCA"})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
