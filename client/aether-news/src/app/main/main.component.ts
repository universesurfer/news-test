import { Component, OnInit, NgZone } from '@angular/core';
import { NewsApiService } from '../service/news-api.service';
import { Router, RouterModule } from '@angular/router';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private bbcJSON: any;

  constructor(
    private newsAPI: NewsApiService,
    private ngZone: NgZone,
    private http: Http
  ) { }

  ngOnInit() {

    this.newsAPI.getBBC()
      .subscribe((res: Response) =>  {
        this.ngZone.run(()=>{
          this.bbcJSON = res;
          console.log(this.bbcJSON.articles);
  });
});




}


}
