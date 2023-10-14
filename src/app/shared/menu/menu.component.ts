import { Component, HostListener } from '@angular/core';
import { ToggleMenu, ToggleVisivility } from '../animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [ToggleMenu, ToggleVisivility],
})
export class MenuComponent {
  subMenuType: string | null;
  previousSubMenu: string | null;
  menuState: string = 'start';
  subMenuState: string;
  windowWidth = window.innerWidth;

  constructor() {
    this.menuState = this.windowWidth >= 1024 ? 'start' : 'hidden';
    this.subMenuState = this.menuState;
    this.subMenuType = this.windowWidth >= 1024 ? 'women' : null;
    this.previousSubMenu = this.subMenuType;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.menuState = this.windowWidth >= 1024 ? 'start' : 'hidden';
    this.subMenuState = this.menuState;
    this.subMenuType = this.windowWidth >= 1024 ? this.previousSubMenu : null;
  }

  toggleMenu() {
    this.menuState = this.menuState === 'visible' ? 'hidden' : 'visible';
    if (this.windowWidth < 1024) {
      this.subMenuType = null;
      this.subMenuState = 'hidden';
    }
  }

  toggleMobileSubMenu() {
    if (this.windowWidth < 1024) {
      this.subMenuState =
        this.subMenuState === 'visible' ? 'hidden' : 'visible';
    }
  }

  toggleSubMenuType(menu: string) {
    this.subMenuType = menu;
    this.previousSubMenu = menu;
    this.toggleMobileSubMenu();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (this.menuState === 'visible') {
      this.menuState = 'hidden';
      this.subMenuState = 'hidden';
      this.subMenuType = null;
    }
  }
}
