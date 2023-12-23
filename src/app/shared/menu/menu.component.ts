import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ToggleMenu, ToggleVisivility } from '../animations';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [ToggleMenu, ToggleVisivility],
})
export class MenuComponent implements OnInit, OnDestroy {
  private userSub?: Subscription;
  private cartItemsSub?: Subscription;
  private favoritesSub?: Subscription;
  private isAdminSub?: Subscription;
  private routerSubscription: Subscription;

  subMenuType: string | null = null;
  menuState: string = 'start';
  subMenuState: string;
  windowWidth = window.innerWidth;
  isAuthenticated = false;
  isAdmin = false;
  catrtItemsCount = 0;
  favoritesCount = 0;
  timer: any;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {
    this.menuState = this.windowWidth >= 1024 ? 'start' : 'hidden';
    this.subMenuState = this.menuState;
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.windowWidth < 1024) {
          this.subMenuState = 'hidden';
          this.menuState = 'hidden';
        } else {
          this.menuState = 'start';
          this.subMenuType = null;
        }
      }
    });
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (user) => (this.isAuthenticated = !!user)
    );
    this.catrtItemsCount = this.cartService.initCartItemsCount();
    this.cartItemsSub = this.cartService.cartItemsCount$.subscribe(
      (count) => (this.catrtItemsCount = count)
    );

    this.favoritesCount = this.favoritesService.initFavoritesCound();
    this.favoritesSub = this.favoritesService.favorites$.subscribe(
      (count) => (this.favoritesCount = count)
    );
    this.isAdminSub = this.authService.isAdmin$.subscribe(
      (isAdmin) => (this.isAdmin = isAdmin)
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
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.windowWidth > 1024) {
      if (
        event.clientY > 118 ||
        (event.clientY < 61 && (event.clientX < 20 || event.clientX > 304))
      ) {
        this.subMenuType = null;
      }
    }
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

  toggleSubMenuTypeOnHover(menu: string) {
    if (this.windowWidth > 1024) {
      this.subMenuType = menu;
      this.toggleMobileSubMenu();
    }
  }

  toggleSubMenuTypeOnClick(menu: string) {
    this.subMenuType = menu;
    this.toggleMobileSubMenu();
  }

  closeMenu() {
    this.toggleMenu();
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

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.cartItemsSub) this.cartItemsSub.unsubscribe();
    if (this.favoritesSub) this.favoritesSub.unsubscribe();
    if (this.isAdminSub) this.isAdminSub.unsubscribe();
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }
}
