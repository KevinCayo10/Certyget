import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'cer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isMenuRequired = false;
  isHeaderRequired = false;
  title = 'CertyGet';
  expanded = true;
  abrir = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleNavigation(event.urlAfterRedirects || event.url);
      }
    });
  }

  private handleNavigation(url: string): void {
    if (url === '/login') {
      this.abrir = false;
      this.expanded = false;
      this.isHeaderRequired = false;
      this.isMenuRequired = false;
    } else {
      this.isHeaderRequired = true;
      this.isMenuRequired = true;
      this.abrir = true;
    }
  }

  toggleExpanded(expanded: boolean) {
    this.expanded = expanded;
  }
}
