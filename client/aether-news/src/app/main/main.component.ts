import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import { NewsApiService } from '../service/news-api.service';
import { Http, Response } from '@angular/http';
import { MapComponent } from '../map/map.component';

import * as __ from "lodash";
import * as _ from "underscore";
import * as $ from 'jquery';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

public duplicateArray: Array<string> = ["duplicate", "duplicate", "duplicate", "not a duplicate"];

//EVENT REGISTRY JSONS
  private eventRegistryBBC: any = [];
  private eventRegistryGuardian: any = [];
  private eventRegistryCNN: any = [];
  private eventRegistryWAPO: any = [];
  private eventRegistryReuters: any = [];
  private eventRegistryNYT: any = [];
  private eventRegistryEconomist: any = [];
  private eventRegistryAP: any = [];
  private eventRegistryWSJ: any = [];

//NEWS API JSONS
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
  private wsjJSON: any;

  //ARRAY OF SELECTED COUNTRY KEYWORD ARRAYS
  private allCountryArrays: any = [];

  //Matched Article Keys/Properties to display in DOM
  private newsApiMatches: any = [];
  private bingApiMatches: any = [];
  private eventRegistryMatchesArray: any = [];
  private allMatches: any = [];

  //COUNTRY KEYWORD ARRAYS
  private americanArray: Array<string> = ["NSA", "CIA", "FBI", "United States", "U.S.", "US", "America", "American", "Americans", "Trump", "Trump's", "Mike Pence", "White House", "Washington", "Clinton", "Obama", "NAFTA"];
  private canadaArray: Array<string> = ["Canada", "Canadian", "Canada's", "Canadians", "Canadian's", "Trudeau", "Justin Trudeau", "Toronto", "Columbia", "Vancouver B.C.", "Vancouver, B.C.", "NAFTA"];
  private mexicoArray: Array<string> = ["Mexico", "Mexican", "Mexicans", "Mexico's", "Mexican's", "Mexico City", "NAFTA", "Vicente Fox", "Peña Nieto"];
  private brazilArray: Array<string> = ["Brazil", "Brasil", "Brazil's", "Brasil's", "Brazilian", "Brasilian", "Brazilian's", "Brasilian's", "Rio de Janeiro", "Sao Paulo", "Michel Temer"];
  private argentinaArray: Array<string> = ["Argentina", "Argentinian", "Argentina's", "Argentinian's", "Argentinians'", "Buenos Aires", "Mauricio Macri"];
  private cubaArray: Array<string> = ["Cuba", "Cuban", "Cuba's", "Cuban's", "Fidel Castro", "Raul Castro", "Che Guevara"];
  private russiaArray: Array<string> = ["Russia", "Russia's", "Moscow", "Vladimir Putin", "Vladimir Putin's", "Putin", "Putin's", "Russian", "Soviet Union", "Soviet", "U.S.S.R.", "USSR"];
  private ukraineArray: Array<string> = ["Ukraine", "Ukrainian", "Ukraine's", "Ukrainians", "Kiev", "Crimea"];
  private chinaArray: Array<string> = ["China", "Chinese", "China's", "Beijing", "Xi Jinping"];
  private taiwanArray: Array<string> = ["Taiwan", "Taiwanese", "Tsai Ing-wen"];
  private northKoreaArray: Array<string> = ["North Korea", "North Korean", "Pyongyang", "Kim Jong Un", "Kim Jong-Un", "North Koreans"];
  private southKoreaArray: Array<string> = ["South Korea", "South Korean", "Seoul"];
  private japanArray: Array<string> = ["Japan", "Japanese", "Japan's", "Shinzo Abe", "Tokyo", "Nagasaki"];
  private philippinesArray: Array<string> = ["Philippines", "Duterte", "Manila"];
  private indiaArray: Array<string> = ["India", "Indian", "India's", "New Delhi", "Mumbai", "Narendra Modi", "Kashmir"];
  private pakistanArray: Array<string> = ["Pakistan", "Pakistani", "Pakistan's", "Kashmir", "Mamnoon Hussain", "Nawaz Sharif"];
  private ukArray: Array<string> = ["United Kingdom", "UK", "Britain", "Brits", "Briton", "Britons", "Briton's", "British", "Britain's", "England's", "UK's", "U.K.'s", "U.K.", "England", "Queen Elizabeth", "Tony Blair", "Theresa May", "Brexit", "Scotland", "Scottish", "Scots", "Northern Ireland", "Northern Irish"];
  private irelandArray: Array<string> = ["Ireland", "Ireland's", "Irish", "Dublin", "Michael D Higgins", "Enda Kenny"];
  private australiaArray: Array<string> = ["Australia", "Australia's", "Australian", "Aussie", "Malcolm Turnbull", "Tony Abbott"];
  private franceArray: Array<string> = ["France", "France's", "French", "Marine Le Pen", "Le Pen", "Emmanuel Macron", "Macron", "Paris"];
  private spainArray: Array<string> = ["Spain", "Spanish", "Spaniard", "Spaniard's", "Catalonia", "Catalunya", "Madrid", "Barcelona"];
  private germanyArray: Array<string> = ["Germany", "German", "Berlin", "Angela Merkel", "Merkel"];
  private syriaArray: Array<string> = ["Syria", "Syrian", "Syrians", "Syria's", "Assad", "Bashar al Assad", "ISIS", "ISIL", "Islamic State", "Free Syrian Army"];
  private egyptArray: Array<string> = ["Egypt", "Egyptian", "Cairo", "Egypt's", "Egyptian's", "Abdel Fattah el-Sisi"];
  private saudiArabiaArray: Array<string> = ["Saudi Arabia", "Saudi", "Saudi's", "Saudi Arabian", "Saudi Arabia's", "King Salman"];
  private turkeyArray: Array<string> = ["Turkey", "Turkish", "Turkey's", "Erdogan", "Erdogan's"];

  private somaliaArray: Array<string> = ["Somalia", "Somalia's", "Somalian", "Somalians", "Al-Shabaab", "al-Shabaab", "al-shabaab", "Mohamed Abdullahi Mohamed", "Mogadishu"];



  share(event) {


    //  var articleContainer = angular.element( document.querySelector( '.article' ) );

    //Enhanced Search!  If a selected country is in the 'event' array, push words relevant to that country to
    //array that we will compare to API JSON title/description keywords

    // $(".articles-container").empty();

    let country;
    let allArrayValues = [];


    if (event.includes("United States")) {
      allArrayValues.push(this.americanArray);
      console.log("America!");
    }

    if (event.includes("Canada")) {
      allArrayValues.push(this.canadaArray);
      console.log("Canada");
    }

    if (event.includes("Mexico")) {
      allArrayValues.push(this.mexicoArray);
      console.log("Mexico");
    }

    if (event.includes("Brazil")) {
      allArrayValues.push(this.brazilArray);
      console.log("Brazil");
    }

    if (event.includes("Argentina")) {
      allArrayValues.push(this.argentinaArray);
      console.log("Argentina");
    }

    if (event.includes("Cuba")) {
      allArrayValues.push(this.cubaArray);
      console.log("Cuba!");
    }

    if (event.includes("Russia")) {
      allArrayValues.push(this.russiaArray);
      console.log("Ruskis!");
    }

    if (event.includes("Ukraine")) {
      allArrayValues.push(this.ukraineArray);
      console.log("Ukraine");
    }

    if (event.includes("China")) {
      allArrayValues.push(this.chinaArray);
      console.log("China");
    }

    if (event.includes("Taiwan")) {
      allArrayValues.push(this.taiwanArray);
      console.log("Taiwan");
    }

    if (event.includes("India")) {
      allArrayValues.push(this.indiaArray);
      console.log("India");
    }

    if (event.includes("Pakistan")) {
      allArrayValues.push(this.pakistanArray);
      console.log("Pakistan");
    }

    if(event.includes("North Korea")) {
      allArrayValues.push(this.northKoreaArray);
      console.log("North Korea");
    }

    if(event.includes("South Korea")) {
      allArrayValues.push(this.southKoreaArray);
      console.log("South Korea");
    }

    if(event.includes("Japan")) {
      allArrayValues.push(this.japanArray);
      console.log("Japan");
    }

    if (event.includes("Philippines")) {
      allArrayValues.push(this.philippinesArray);
      console.log("Philippines!");
    }

    if (event.includes("United Kingdom")) {
      allArrayValues.push(this.ukArray);
      console.log("United Kingdom!");
    }

    if (event.includes("Ireland")) {
      allArrayValues.push(this.irelandArray);
      console.log("Ireland");
    }

    if (event.includes("Australia")) {
      allArrayValues.push(this.australiaArray);
      console.log(this.australiaArray);
    }

    if (event.includes("France")) {
      allArrayValues.push(this.franceArray);
      console.log("Frenchies!");
    }

    if (event.includes("Spain")) {
      allArrayValues.push(this.spainArray);
      console.log("Spain");
    }

    if (event.includes("Germany")) {
      allArrayValues.push(this.germanyArray);
      console.log("Zee Deutschland!");
    }

    if (event.includes("Syria")) {
      allArrayValues.push(this.syriaArray);
      console.log("Syria");
    }

    if (event.includes("Saudi Arabia")) {
      allArrayValues.push(this.saudiArabiaArray);
      console.log("Saudi Arabia");
    }

    if (event.includes("Egypt")) {
      allArrayValues.push(this.egyptArray);
      console.log("Egypt");
    }

    if (event.includes("Turkey")) {
      allArrayValues.push(this.turkeyArray);
      console.log("Turkey");
    }


    if (event.includes("Somalia")) {
      allArrayValues.push(this.somaliaArray);
      console.log("Somalia!");
    }


//   switch (event.includes(country) ) {
//       case country === "United States":
//       console.log("Murica!");
//       // allArrays.push(this.americanArray);
//       // console.log(this.americanArray);
//
//       case country === "Russia":
//       console.log("Ruskis!");
//       // allArrays.push(this.russiaArray);
//       // console.log(this.russiaArray);
//                       //Omitting the 'break' lets the switch statement continue to run through code
//
// }

console.log(__.flatten(allArrayValues));







    //Combines NEWS API arrays for easier iteration
    var combinedArray = this.bbcJSON.articles.concat(this.alJazeeraJSON.articles, this.apJSON.articles, this.googleJSON.articles, this.economistJSON.articles, this.nytJSON.articles, this.wapoJSON.articles, this.cnnJSON.articles, this.newsweekJSON.articles, this.reutersJSON.articles, this.guardianUkJSON.articles, this.guardianAuJSON.articles, this.huffPostJSON.articles, this.wsjJSON.articles);
    console.log('Combined news article array', combinedArray);


    var combinedEventRegistry = this.eventRegistryBBC.concat(this.eventRegistryGuardian, this.eventRegistryCNN, this.eventRegistryWAPO, this.eventRegistryReuters, this.eventRegistryNYT, this.eventRegistryEconomist, this.eventRegistryAP, this.eventRegistryWSJ);
    console.log("Combined Event Registry Articles Array", combinedEventRegistry);


    //SEARCHING EventRegistry NEWS DESCRIPTIONS FOR SELECTED COUNTRY KEYWORD, RETURN RESULT
    let eventRegistryTitles = _.map(combinedEventRegistry, 'title');
    console.log("Seeing if ER title mapping works", eventRegistryTitles);
    let eventRegistryResult = event.map(function(word){
      return eventRegistryTitles.filter(function(article){
        return article.toString().indexOf(word) > -1;
      });
    });


    console.log("Mapped Event Registry Result", eventRegistryResult);


    //Event Registry Api
    //RETURNS ARTICLES MENTIONING AT LEAST 2 COUNTRIES, USING THEIR SEMANTICALLY EQUIVALENT KEYWORDS

    //Remove duplicate titles
    var eventRegistryFiltered = eventRegistryTitles.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
    })


    console.log("duplicate array", eventRegistryTitles);
    console.log("removed duplicates array", eventRegistryFiltered);

    const eventRegistryMatches = eventRegistryFiltered.filter(
      article => allArrayValues.every(
          words => words.find(
              word => article.toString().includes(word)
          )
      )
  );

  console.log("Articles mentioning at least two countries from EventRegistry JSON", eventRegistryMatches);


    //Iterating over the ARTICLE TITLES to see if they have country name from selected countries
    // var newArray = _.map(combinedArray, 'description');
    // console.log("Combined News API descriptions", newArray);
    // let result =  event.map(function(word){
    // 	return newArray.filter(function(article){
    //     // console.log(article);
    //   	return article.toString().indexOf(word) > -1;
    //   });
    // });


    // console.log(result);
    // console.log(event);
    //
    // let combinedBing = this.bingWorldJSON.value.concat(this.bingPoliticsJSON.value);
    //
    //SEARCHING BING NEWS DESCRIPTIONS FOR SELECTED COUNTRY KEYWORD, RETURN RESULT
    // let bingArray = _.pick(_.find('description', 'title', 'url'));
    // let bingArray = _.map(combinedBing, 'description');
    // let bingResult =  event.map(function(word){
    // 	return bingArray.filter(function(article){
    //     // console.log(article);
    //   	return article.toString().indexOf(word) > -1;
    //   });
    // });

    // console.log(bingResult);
    //
    // //RETURNS ARTICLES MENTIONING AT LEAST 2 COUNTRIES, USING THEIR SEMANTICALLY EQUIVALENT KEYWORDS
    //
    //Bing Api
    // const bingMatches = bingArray.filter(
    //     article => allArrayValues.every(
    //         words => words.find(
    //             word => article.toString().includes(word)
    //         )
    //     )
    // );

    // console.log('articles with mentioning at least 2 countries:');
    // console.log(bingMatches);
    // //
    //News Api
    var newArray = _.map(combinedArray, 'title');
    console.log("Combined News API descriptions", newArray);
    const newsApiMatches = newArray.filter(
        article => allArrayValues.every(
            words => words.find(
                word => article.toString().includes(word)
            )
        )
    );

    // Combine Articles of News API and Bing
    // var allNews = newArray.concat(bingArray);
    // console.log('Combined NEWS API and BING titles/descriptions', allNews);


    // console.log('articles with mentioning at least 2 countries from News API:');
    // console.log(newsApiMatches);

    // const combinedMatches = bingMatches.concat(newsApiMatches);
    // console.log("Combined Matches from Bing and News Api: ", combinedMatches);


    for (let article of combinedEventRegistry) {
      for (let match of eventRegistryMatches) {
        if (article.title == match) {
        var eventRegistryObject = {title: article.title, description: article.description, url: article.url, image: article.image, source: article.source.title, thumbnail: article.source.details.thumbImage };
        //Push article objects to global array
        this.eventRegistryMatchesArray.push(eventRegistryObject);

        console.log("Article url: ", article.url, 'Article title: ', article.title);
      }
    }
  }
        console.log("Seeing if ER articles are pushing", this.eventRegistryMatchesArray);

  //   for (let article of combinedArray) {
  //     for (let match of combinedMatches) {
  //       if (article.title == match) {
  //       var articleObject = {title: article.title, description: article.description, url: article.url, image: article.urlToImage};
  //       //Push article objects to global array
  //       this.newsApiMatches.push(articleObject);
  //       console.log("Article url: ", article.url, 'Article title: ', article.title);
  //     }
  //   }
  // }
  //       console.log("Seeing if articles are pushing", this.newsApiMatches);


  //
  //
  //   for (let article of combinedBing) {
  //     for (let match of combinedMatches) {
  //       if (article.description == match) {
  //         var bingArticleObject = {title: article.name, description: article.description, url: article.url, image: article.image.thumbnail.contentUrl, source: article.provider[0].name};
  //         //Push article objects to global array
  //         this.bingApiMatches.push(bingArticleObject);
  //         console.log("Article url: ", article.url, "Article description: ", article.description);
  //       }
  //     }
  //
  //   }
  //       console.log("Seeing if Bing matches are pushing", this.bingApiMatches);


    //COMBINE ALL MATCHED ARTICLES, FROM ALL APIS
    this.allMatches = this.eventRegistryMatchesArray.concat(this.newsApiMatches);
    console.log("All matches", this.allMatches);




}


  constructor(
    private ngZone: NgZone,
    private http: Http,
    private router: Router,
    private newsAPI: NewsApiService,
    // private myElement: ElementRef

  ) { }

  ngOnInit() {

    //Return current news from Event Registry BBC
    //
    // this.newsAPI.getEventRegistryBBC()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(()=> {
    //     this.eventRegistryBBC = res;
    //     console.log("BBC - The Event Registry", this.eventRegistryBBC);
    //   });
    // });

    // //Return current news from Event Registry Guardian
    // this.newsAPI.getEventRegistryGuardian()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryGuardian = res;
    //     console.log("The Guardian - Event Registry", this.eventRegistryGuardian);
    //   });
    // });
    //
    // //Return current news from Event Registry CNN International
    // this.newsAPI.getEventRegistryCNN()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryCNN = res;
    //     console.log("CNN International - Event Registry", this.eventRegistryCNN);
    //   });
    // });
    //
    //Return current news from Event Registry Washington Post
    this.newsAPI.getEventRegistryWAPO()
    .subscribe((res: Response) => {
      this.ngZone.run(() => {
        this.eventRegistryWAPO = res;
        console.log("Washington Post - Event Registry", this.eventRegistryWAPO);
      });
    });
    //
    //Return current news from Event Registry Reuters
    this.newsAPI.getEventRegistryReuters()
    .subscribe((res: Response) => {
      this.ngZone.run(() => {
        this.eventRegistryReuters = res;
        console.log("Reuters - Event Registry", this.eventRegistryReuters);
      });
    });
    //
    // //Return current news from Event Registry New York Times
    // this.newsAPI.getEventRegistryNYT()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryNYT = res;
    //     console.log("NYT - Event Registry", this.eventRegistryNYT);
    //   });
    // });
    //
    // //Return current news from Event Registry Economist
    // this.newsAPI.getEventRegistryEconomist()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryEconomist = res;
    //     console.log("Economist - Event Registry", this.eventRegistryEconomist);
    //   });
    // });
    //
    // //Return current news from Event Registry Associated Press
    // this.newsAPI.getEventRegistryAP()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryAP = res;
    //     console.log("Associated Press - Event Registry", this.eventRegistryAP);
    //   });
    // });
    //
    // //Return current news from Event Registry Wall Street Journal
    // this.newsAPI.getEventRegistryWSJ()
    // .subscribe((res: Response) => {
    //   this.ngZone.run(() => {
    //     this.eventRegistryWSJ = res;
    //     console.log("Wall Street Journal - Event Registry", this.eventRegistryWSJ);
    //   });
    // });
    //



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

  //Get the top 10 Headlines for Wall Street Journal
  this.newsAPI.getWSJ()
  .subscribe((res: Response) =>  {
    this.ngZone.run(()=>{
      this.wsjJSON = res;
      console.log('Wall Street Journal', this.wsjJSON.articles);  //show top 10 articles from HuffPost
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


// goToArticle(url) {
//   this.router.navigate(url);
// }





}
