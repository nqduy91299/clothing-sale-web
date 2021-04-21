import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getCookie } from 'src/app/share/constants/cookie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = getCookie('SOA-final-prj');
    if (token) {
      this.redirect();
    } else {
      this.router.navigate(['/login']);
    }
  }
  redirect() {
    if (location.pathname === '/admin') {
      this.router.navigate(['/admin/products-management']);
    }
  }

  logout() {
    var cookies = document.cookie.split('; ');
    for (var c = 0; c < cookies.length; c++) {
      var d = window.location.hostname.split('.');
      while (d.length > 0) {
        var cookieBase =
          encodeURIComponent(cookies[c].split(';')[0].split('=')[0]) +
          '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' +
          d.join('.') +
          ' ;path=';
        var p = location.pathname.split('/');
        document.cookie = cookieBase + '/';
        while (p.length > 0) {
          document.cookie = cookieBase + p.join('/');
          p.pop();
        }
        d.shift();
      }
    }
    this.router.navigate(['/login']);
  }
}
