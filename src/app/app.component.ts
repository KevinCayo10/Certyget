import { Component } from '@angular/core';

@Component({
  selector: 'cer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CertyGet';
  expanded = true;

  toggleExpanded(expanded: boolean) {
    this.expanded = expanded;
  }
}
