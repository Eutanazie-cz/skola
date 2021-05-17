import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../core/service/api-service.service';
import {of} from 'rxjs';
import {DataRequest} from '../../shared/models/data-request';

@Component({
             selector: 'app-home-page',
             templateUrl: './home-page.component.html',
             styleUrls: ['./home-page.component.scss']
           })
export class HomePageComponent implements OnInit {

  setup: string;
  punchline: string;
  jokeInCookie: DataRequest;
  loading = false;
  private readonly lastJoke = 'lastJoke';

  constructor(private readonly apiService: ApiServiceService) {
  }

  ngOnInit() {
    this.jokeInCookie = JSON.parse(this.getCookie(this.lastJoke));
    if (this.jokeInCookie) {
      this.setup = this.jokeInCookie.setup;
      this.punchline = this.jokeInCookie.punchline;
    }
  }

  tellMeJoke(): void {
    this.loading = true;
    this.setup = undefined;
    this.punchline = undefined;
    this.apiService.getJoke()
      .subscribe((data) => {
        this.setCookie(this.lastJoke, JSON.stringify(data), 1);
        this.setup = data.setup;
        this.punchline = data.punchline;
        this.loading = false;
      });
  }

  setCookie(name, value, days): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  getCookie(name): string {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return '';
  }
}
