import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
// import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';

@Injectable()
export class NewsApiService {

  public bingToken: string;
  public bbc: any;
  public bingWorld: any;
  public bingPolitics: any;
  public apNews: any;
  public googleNews: any;
  public economistNews: any;
  public nytNews: any;
  public wapoNews: any;
  public cnnNews: any;
  public newsweekNews: any;
  public reutersNews: any;
  public guardianUkNews: any;
  public guardianAuNews: any;
  public huffPostNews: any;
  public wsjNews: any;
  public eventRegistry: any;

  constructor(
    private http: Http,
    private router: Router
  ) {

    // Set Token Variable
      this.bingToken = "3393050cb6564841a62d58f60b8f4ccb";
      if (this.bingToken != null) {
        console.log("API token works");
      } else {
        alert("API token not working");
      }

   }


getEventRegistry(){
  return this.http.get("http://eventregistry.org/json/article?sourceUri=www.bbc.co.uk&sourceUri=www.bbcamerica.com&sourceUri=www.theguardian.com&sourceUri=edition.cnn.com&sourceUri=www.washingtonpost.com&sourceUri=www.reuters.com&sourceUri=www.nytimes.com&sourceUri=www.economist.com&sourceUri=hosted.ap.org&sourceUri=www.wsj.com&categoryUri=dmoz%2FSociety%2FPolitics&lang=eng&action=getArticles&articlesSortBy=date&resultType=articles&articlesIncludeArticleLocation=true&articlesIncludeSourceDescription=true&articlesIncludeSourceLocation=true&articlesIncludeSourceDetails=true&apiKey=3c5819e5-c21f-4374-8977-d1c9cdcc9048")
    .map((res) => {
      this.eventRegistry = res.json()
      return res.json().articles;
    })
}


getBBC(){
  return this.http.get('https://newsapi.org/v1/articles?source=bbc-news&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.bbc = res.json()
      return res.json();
    })
}

getAlJazeera(){
  return this.http.get('https://newsapi.org/v1/articles?source=al-jazeera-english&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.bbc = res.json()
      return res.json();
    })
}

getAP(){
  return this.http.get('https://newsapi.org/v1/articles?source=associated-press&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.apNews = res.json()
      return res.json();
    })
}

getGoogle(){
  return this.http.get('https://newsapi.org/v1/articles?source=google-news&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.googleNews = res.json()
      return res.json();
    })
}

getEconomist(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-economist&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.economistNews = res.json()
      return res.json();
    })
}

getNYT(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-new-york-times&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.nytNews = res.json()
      return res.json();
    })
}

getWAPO(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-washington-post&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.wapoNews = res.json()
      return res.json();
    })
}

getCNN(){
  return this.http.get('https://newsapi.org/v1/articles?source=cnn&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.cnnNews = res.json()
      return res.json();
    })
}

getNEWSWEEK(){
  return this.http.get('https://newsapi.org/v1/articles?source=newsweek&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.newsweekNews = res.json()
      return res.json();
    })
}

getREUTERS(){
  return this.http.get('https://newsapi.org/v1/articles?source=reuters&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.reutersNews = res.json()
      return res.json();
    })
}

getGuardianUK(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-guardian-uk&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.guardianUkNews = res.json()
      return res.json();
    })
}

getGuardianAU(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-guardian-au&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.guardianAuNews = res.json()
      return res.json();
    })
}

getHuffPost(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-huffington-post&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.huffPostNews = res.json()
      return res.json();
    })
}

getWSJ(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-wall-street-journal&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.wsjNews = res.json()
      return res.json();
    })
}


getBingWorldNews() {
  let headers = new Headers({ 'Ocp-Apim-Subscription-Key': this.bingToken });
  let options = new RequestOptions({ headers: headers });
    return this.http.get(`https://api.cognitive.microsoft.com/bing/v5.0/news/?Category=World&count=100`, options)
      .map((res) => {
        this.bingWorld = res.json()
        return res.json();
      })
}

getBingPoliticsNews() {
  let headers = new Headers({ 'Ocp-Apim-Subscription-Key': this.bingToken });
  let options = new RequestOptions({ headers: headers });
    return this.http.get(`https://api.cognitive.microsoft.com/bing/v5.0/news/?Category=Politics&count=100`, options)
      .map((res) => {
        this.bingPolitics = res.json()
        return res.json();
      })
}







}
