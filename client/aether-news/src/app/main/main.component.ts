import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import { NewsApiService } from '../service/news-api.service';
import { Http, Response } from '@angular/http';
import { MapComponent } from '../map/map.component';

import * as _ from "lodash";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private bbcJSON: any;
  private alJazeeraJSON: any;
  private bingWorldJSON: any;
  private bingPoliticsJSON: any;



  // public test: Array<[{test: 'hi'}, {test: 'lol'}, {test: 'bzzzz'}]>;

  share(event) {
    console.log(_.map(this.bbcJSON, 'title'));

    // var newArray = _.map(this.bbcJSON, 'author');
    // console.log(newArray);
    console.log(event);
}


  // share(event) {
  //     if ( _.difference(event, this.test).length === 0) {
  //       console.log("works");
  //     }
  //
  //     else {
  //       console.log("nope");
  //     }
  // };



  constructor(
    private ngZone: NgZone,
    private http: Http,
    private router: Router,
    private newsAPI: NewsApiService
  ) { }

  ngOnInit() {

    //Get the top 10 Headlines for BBC
    this.newsAPI.getBBC()
    .subscribe((res: Response) =>  {
      this.ngZone.run(()=>{
        this.bbcJSON = res;
        console.log(this.bbcJSON.articles);  //show top 10 articles from BBC Json
    });
  });

      //Get the top 10 Headlines for Al Jazeera
      this.newsAPI.getAlJazeera()
      .subscribe((res: Response) =>  {
        this.ngZone.run(()=>{
          this.alJazeeraJSON = res;
          console.log(this.alJazeeraJSON.articles);  //show top 10 articles from BBC Json
    });
  });

    //Get World News from Bing News Search
    this.newsAPI.getBingWorldNews()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
        this.bingWorldJSON = res;
        console.log(this.bingWorldJSON.value);
      });
    });

    //Get Politics News from Bing News Search
    this.newsAPI.getBingPoliticsNews()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
        this.bingPoliticsJSON = res;
        console.log(this.bingPoliticsJSON.value);
      });
    });





}


// logCountries() {
//   console.log(this.selectedCountries);
// }





}
