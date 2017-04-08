import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AmChartsService } from "amcharts3-angular2";

declare var AmCharts : any; //we must declare our AmCharts variable, like Google

// declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  // private map: any;

  constructor() { }


  ngOnInit() {


    var map = AmCharts.makeChart("mapdiv",{
    type: "map",
    theme: "dark",
    projection: "mercator",
    panEventsEnabled : true,
    backgroundColor : "#535364",
    backgroundAlpha : 1,
    zoomControl: {
    zoomControlEnabled : true
    },
    dataProvider : {
    map : "worldHigh",
    getAreasFromMap : true,
    areas :
    []
    },
    areasSettings : {
    autoZoom : false,
    selectable: true,
    color : "#B4B4B7",
    colorSolid : "#84ADE9",
    selectedColor : "#84ADE9",
    outlineColor : "#666666",
    rollOverColor : "#9EC2F7",
    rollOverOutlineColor : "#000000"
  },
    listeners: [{
      "event": "clickMapObject",
      "method": function(e) {

     // Ignore any click not on area
     if (e.mapObject.objectType !== "MapArea")
       return;

     var area = e.mapObject;

     // Toggle showAsSelected
     area.showAsSelected = !area.showAsSelected;
     e.chart.returnInitialColor(area);

     // Update the list
     document.getElementById("selected").innerHTML = JSON.stringify(getSelectedCountries());
   }
 }]
});

    /**
 * Function which extracts currently selected country list.
 * Returns array consisting of country ISO2 codes
 */
function getSelectedCountries() {
  var selected = [];
  for(var i = 0; i < map.dataProvider.areas.length; i++) {
    if(map.dataProvider.areas[i].showAsSelected)
      selected.push(map.dataProvider.areas[i].id);
  }
  return selected;
}

      // let map;
      //
      //
      //
      //      let mapOptions = {
      //       center: new google.maps.LatLng(0,0),
      //       zoom: 2
      //   };
      //
      //   map = new google.maps.Map(document.getElementById('map'), mapOptions);



      // google.charts.load('current', {'packages':['geochart']});
      //      google.charts.setOnLoadCallback(drawRegionsMap);
      //
      //      function drawRegionsMap() {
      //
      //        var data = google.visualization.arrayToDataTable([
      //          ['Country', 'Popularity'],
      //          ['Germany', 200],
      //          ['United States', 300],
      //          ['Brazil', 400],
      //          ['Colombia', 700],
      //          ['Argentina', 700],
      //          ['Paraguay', 700],
      //          ['Uruguay', 700],
      //          ['Chile', 700],
      //          ['Peru', 700],
      //          ['Ecuador', 700],
      //          ['Venezuela', 700],
      //          ['Bolivia', 700],
      //          ['Guyana', 700],
      //          ['Suriname', 700],
      //          ['French Guiana', 700],
      //          ['Trinidad and Tobago', 700],
      //          ['Jamaica', 700],
      //          ['Panama', 700],
      //          ['Honduras', 700],
      //          ['El Salvador', 700],
      //          ['Costa Rica', 700],
      //          ['Nicaragua', 700],
      //          ['Guatemala', 700],
      //          ['Mexico', 700],
      //          ['Belize', 700],
      //          ['Cuba', 700],
      //          ['Haiti', 700],
      //          ['Puerto Rico', 700],
      //          ['Dominican Republic', 700],
      //          ['Canada', 500],
      //          ['France', 600],
      //          ['Russia', 700],
      //          ['United Kingdom', 700],
      //          ['Australia', 700],
      //          ['New Zealand', 700],
      //
      //        ]);
      //
      //        var options = {};
      //
      //        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
      //
      //        chart.draw(data, options);
      //      }


}
}
