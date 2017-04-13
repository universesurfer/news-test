import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AmChartsService } from "amcharts3-angular2";

declare var AmCharts : any; //we must declare our AmCharts variable, like Google

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  selectedCountries: any;
  map: any;

  constructor()
 {}


  ngOnInit() {


    this.map = AmCharts.makeChart("mapdiv", {
           type: "map",
           theme: "dark",
           projection: "mercator",
           panEventsEnabled: true,
           backgroundColor: "#535364",
           backgroundAlpha: 1,
           zoomControl: {
               zoomControlEnabled: true
           },
           dataProvider: {
               map: "worldHigh",
               getAreasFromMap: true,
               areas:
               []
           },
           areasSettings: {
               autoZoom: false,
               selectable: true,
               color: "#B4B4B7",
               colorSolid: "#84ADE9",
               selectedColor: "#84ADE9",
               outlineColor: "#666666",
               rollOverColor: "#9EC2F7",
               rollOverOutlineColor: "#000000"
           },
           listeners: [{
               "event": "clickMapObject",
               "method": (e) => {

                   // Ignore any click not on area
                   if (e.mapObject.objectType !== "MapArea")
                       return;

                   var area = e.mapObject;

                   // Toggle showAsSelected
                   area.showAsSelected = !area.showAsSelected;
                   e.chart.returnInitialColor(area);

                   // Update the list
                   let result = this.getSelectedCountries(this.map);
                   document.getElementById("selected").innerHTML = JSON.stringify(result );
                   this.selectedCountries = result;

               }
           }]
       });

       /**
    * Function which extracts currently selected country list.
    * Returns array of country names
    */


   }

   getSelectedCountries(map: any) {
           var selected = [];
           for (var i = 0; i < map.dataProvider.areas.length; i++) {
               if (map.dataProvider.areas[i].showAsSelected)
                   selected.push(map.dataProvider.areas[i].enTitle);
                   
           }

           return selected;
       }



}
