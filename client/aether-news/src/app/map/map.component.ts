import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { AgmCoreModule } from "angular2-google-maps/core";   //Google Maps
import { MapsAPILoader } from 'angular2-google-maps/core';
import { SebmGoogleMap, SebmGooglePolyline, SebmGooglePolylinePoint } from 'angular2-google-maps/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number = 0;
  lng: number = 0;
  zoom: number = 2;


  constructor() { }

  ngOnInit() {
  }

}
