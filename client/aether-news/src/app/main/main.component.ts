import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import { NewsApiService } from '../service/news-api.service';
import { Http, Response } from '@angular/http';
import { MapComponent } from '../map/map.component';

// import * as _ from "lodash";
import * as _ from "underscore";

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
  private apJSON: any;
  private googleJSON: any;
  private economistJSON: any;
  private nytJSON: any;
  private wapoJSON: any;
  private cnnJSON: any;
  private newsweekJSON: any;
  private reutersJSON: any;
  private guardianUkJSON: any;
  private guardianAuJSON: any;
  private huffPostJSON: any;



  share(event) {
    //Combines NEWS API arrays for easier iteration
    var combinedArray = this.bbcJSON.articles.concat(this.alJazeeraJSON.articles, this.apJSON.articles, this.googleJSON.articles, this.economistJSON.articles, this.nytJSON.articles, this.wapoJSON.articles, this.cnnJSON.articles, this.newsweekJSON.articles, this.reutersJSON.articles, this.guardianUkJSON.articles, this.guardianAuJSON.articles, this.huffPostJSON.articles);
    console.log('Combined news article array', combinedArray);

    //Iterating over the article titles to see if they have country name from selected countries
    var newArray = _.map(combinedArray, 'title');
    let result =  event.map(function(word){
    	return newArray.filter(function(article){
        // console.log(article);
      	return article.toString().indexOf(word) > -1;
      });
    });

    console.log(result);
    console.log(event);

    let combinedBing = this.bingWorldJSON.value.concat(this.bingPoliticsJSON.value);

    let bingArray = _.map(combinedBing, 'description');
    let bingResult =  event.map(function(word){
    	return bingArray.filter(function(article){
        // console.log(article);
      	return article.toString().indexOf(word) > -1;
      });
    });

    console.log(bingResult);

}


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
        console.log('BBC', this.bbcJSON.articles);  //show top 10 articles from BBC Json
    });
  });

  //Get the top 10 Headlines for Associated Press
    this.newsAPI.getAP()
    .subscribe((res: Response) =>  {
      this.ngZone.run(()=>{
        this.apJSON = res;
        console.log('Associated Press', this.apJSON.articles);  //show top 10 articles from Associated Press
    });
    });

    //Get the top 10 Headlines for Google News
    this.newsAPI.getGoogle()
    .subscribe((res: Response) =>  {
      this.ngZone.run(()=>{
        this.googleJSON = res;
        console.log('Google News', this.googleJSON.articles);  //show top 10 articles from Google News
    });
  });

  //Get the top 10 Headlines for the Economist
      this.newsAPI.getEconomist()
      .subscribe((res: Response) =>  {
        this.ngZone.run(()=>{
          this.economistJSON = res;
          console.log('Economist', this.economistJSON.articles);  //show top 10 articles from Economist
      });
    });

    //Get the top 10 Headlines for the New York Times
        this.newsAPI.getNYT()
        .subscribe((res: Response) =>  {
          this.ngZone.run(()=>{
            this.nytJSON = res;
            console.log('The New York Times', this.nytJSON.articles);  //show top 10 articles from NYT
        });
      });

      //Get the top 10 Headlines for The Washington Post
          this.newsAPI.getWAPO()
          .subscribe((res: Response) =>  {
            this.ngZone.run(()=>{
              this.wapoJSON = res;
              console.log('Washington Post', this.wapoJSON.articles);  //show top 10 articles from WAPO
          });
        });

        //Get the top 10 Headlines for CNN
            this.newsAPI.getCNN()
            .subscribe((res: Response) =>  {
              this.ngZone.run(()=>{
                this.cnnJSON = res;
                console.log('CNN', this.cnnJSON.articles);  //show top 10 articles from CNN
            });
          });

  //Get the top 10 Headlines for Newsweek
      this.newsAPI.getNEWSWEEK()
      .subscribe((res: Response) =>  {
        this.ngZone.run(()=>{
          this.newsweekJSON = res;
          console.log('Newsweek', this.newsweekJSON.articles);  //show top 10 articles from Newsweek
      });
    });


  //Get the top 10 Headlines for Reuters
      this.newsAPI.getREUTERS()
      .subscribe((res: Response) =>  {
        this.ngZone.run(()=>{
          this.reutersJSON = res;
          console.log('Reuters', this.reutersJSON.articles);  //show top 10 articles from Reuters
      });
    });

    //Get the top 10 Headlines for The Guardian UK
    this.newsAPI.getGuardianUK()
    .subscribe((res: Response) =>  {
      this.ngZone.run(()=>{
        this.guardianUkJSON = res;
        console.log('Guardian UK', this.guardianUkJSON.articles);  //show top 10 articles from GuardianUK
  });
});

  //Get the top 10 Headlines for The Guardian AU
  this.newsAPI.getGuardianAU()
  .subscribe((res: Response) =>  {
    this.ngZone.run(()=>{
      this.guardianAuJSON = res;
      console.log('Guardian AU', this.guardianAuJSON.articles);  //show top 10 articles from GuardianAU
  });
  });

  //Get the top 10 Headlines for HuffPost
  this.newsAPI.getHuffPost()
  .subscribe((res: Response) =>  {
    this.ngZone.run(()=>{
      this.huffPostJSON = res;
      console.log('Huffington Post', this.huffPostJSON.articles);  //show top 10 articles from HuffPost
  });
  });

      //Get the top 10 Headlines for Al Jazeera
      this.newsAPI.getAlJazeera()
      .subscribe((res: Response) =>  {
        this.ngZone.run(()=>{
          this.alJazeeraJSON = res;
          console.log('Al Jazeera', this.alJazeeraJSON.articles);  //show top 10 articles from Al Jazeera
    });
  });



    //Get World News from Bing News Search
    this.newsAPI.getBingWorldNews()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
        this.bingWorldJSON = res;
        console.log('Bing World News', this.bingWorldJSON.value);
      });
    });

    //Get Politics News from Bing News Search
    this.newsAPI.getBingPoliticsNews()
      .subscribe((res: Response) => {
        this.ngZone.run(() => {
        this.bingPoliticsJSON = res;
        console.log('Bing Politics News', this.bingPoliticsJSON.value);
      });
    });





}


// logCountries() {
//   console.log(this.selectedCountries);
// }





}
