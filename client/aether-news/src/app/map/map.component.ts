import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { AgmCoreModule } from "angular2-google-maps/core";   //Google Maps

// import { MapsAPILoader, LatLngLiteral, SebmGoogleMap, SebmGoogleMapPolygon } from 'angular2-google-maps/core';
declare var google: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  lat: number = 0;
  lng: number = 0;
  zoom: number = 2;

  // google.charts.load('current', {'packages':['geochart']});
  //     google.charts.setOnLoadCallback(drawRegionsMap);


  constructor() { }


  ngOnInit() {

      let mapOptions = {
            center: new google.maps.LatLng(0,0),
            zoom: 3
        };

        let map = new google.maps.Map(document.getElementById('map'), mapOptions);

  }

}
