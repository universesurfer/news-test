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

//Services
import { NewsApiService } from './service/news-api.service';



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
  providers: [NewsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
