import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  constructor(private http: HttpClient, private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state && state['id']) {
      this.http
        .get('https://demo.k0s.nxtcloud.it/api/rest/getTestUser/' + state['id'])
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
