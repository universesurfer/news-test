import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
// import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';

@Injectable()
export class NewsApiService {

  public token: string;
  public bbc: any;

  constructor(
    private http: Http,
    private router: Router
  ) {

    // Set Token Variable
      this.token = "dd5bd57f45cc49fb91999189ffcf95fd";
      if (this.token != null) {
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

    // this.http.get('https://newsapi.org/v1/articles?source=al-jazeera-english&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')


}
