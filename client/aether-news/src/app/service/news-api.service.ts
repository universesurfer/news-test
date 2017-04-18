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
