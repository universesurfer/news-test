import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class NewsApiService {

  public token: string;

  constructor(
    private http: Http;
    private router: Router;
  ) {

    // Set Token Variable
      this.token = "dd5bd57f45cc49fb91999189ffcf95fd";
      if (this.token != null) {
        console.log("API token works");
      } else {
        alert("API token not working");
      }

   }








}
