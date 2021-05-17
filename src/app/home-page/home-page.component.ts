import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../core/service/api-service.service';

@Component({
             selector: 'app-home-page',
             templateUrl: './home-page.component.html',
             styleUrls: ['./home-page.component.scss']
           })
export class HomePageComponent implements OnInit {

  setup: string;
  punchline: string;

  loading = false;

  constructor(private readonly apiService: ApiServiceService) {
  }

  ngOnInit() {
  }

  tellMeJoke(): void {
    this.loading = true;
    this.setup = undefined;
    this.punchline = undefined;
    this.apiService.getJoke()
      .subscribe((data) => {
        this.setup = data.setup;
        this.punchline = data.punchline;
        this.loading = false;
      });
  }
}
