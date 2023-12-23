import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  // Guard that prevents users from accessing invalid routes

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const segments = state.url.split('/');
    if (
      (segments[2] === 'women' ||
        segments[2] === 'men' ||
        segments[2] === 'kids') &&
      (segments[3] === 'shoes' ||
        segments[3] === 'tops' ||
        segments[3] === 'leggings' ||
        segments[3] === 'jackets' ||
        segments[3] === 'bottoms' ||
        segments[3] === 'sets')
    ) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
