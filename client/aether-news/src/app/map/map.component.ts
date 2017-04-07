import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  constructor() { }


  ngOnInit() {

      // let mapOptions = {
      //       center: new google.maps.LatLng(0,0),
      //       zoom: 2
      //   };
      //
      //   let map = new google.maps.Map(document.getElementById('map'), mapOptions);


      google.charts.load('current', {'packages':['geochart']});
           google.charts.setOnLoadCallback(drawRegionsMap);

           function drawRegionsMap() {

             var data = google.visualization.arrayToDataTable([
               ['Country', 'Popularity'],
               ['Germany', 200],
               ['United States', 300],
               ['Brazil', 400],
               ['Canada', 500],
               ['France', 600],
               ['RU', 700]
             ]);

             var options = {};

             var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

             chart.draw(data, options);
           }
  }

}
