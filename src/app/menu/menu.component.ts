import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('toggleSubMenu', [
      transition(':enter', [
        style({ height: 0 }),
        animate('500ms ease-out', style({ height: '100%' })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class MenuComponent {
  subMenu: string | null = null;

  toggleSubMenu(menu: string) {
    this.subMenu = this.subMenu === menu ? null : menu;
  }
}
