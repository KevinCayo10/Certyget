import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMenu, MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'cer-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent {
  path: IMenu;
  constructor(
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute
  ) {
    const currentPath =
      '/' + activatedRoute.snapshot.pathFromRoot[1].routeConfig?.path;
    this.path = menuService.getMenuByUrl(currentPath);
  }
}
