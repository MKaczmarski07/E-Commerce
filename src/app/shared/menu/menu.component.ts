import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ToggleMenu, ToggleVisivility } from '../animations';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [ToggleMenu, ToggleVisivility],
})
export class MenuComponent implements OnInit, OnDestroy {
  subMenuType: string | null;
  previousSubMenu: string | null;
  menuState: string = 'start';
  subMenuState: string;
  windowWidth = window.innerWidth;
  isAuthenticated = false;
  private userSub?: Subscription;
  private cartItemsSub?: Subscription;
  catrtItemsCount = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.menuState = this.windowWidth >= 1024 ? 'start' : 'hidden';
    this.subMenuState = this.menuState;
    this.subMenuType = this.windowWidth >= 1024 ? 'Women' : null;
    this.previousSubMenu = this.subMenuType;
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (user) => (this.isAuthenticated = !!user)
    );
    this.catrtItemsCount = this.cartService.getCartItems().length;
    this.cartItemsSub = this.cartService.cartItemsCount$.subscribe(
      (count) => (this.catrtItemsCount = count)
    );
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/home']);
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

  openCart() {
    this.router.navigate(['/cart']);
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.cartItemsSub) this.cartItemsSub.unsubscribe();
  }
}
