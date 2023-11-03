import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, Router } from '@angular/router';
import { RedirectGuard } from './guards/redirect.guard';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './shared/product-details/product-details.component';
import { AuthComponent } from './auth/auth.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'products/:category/:subCategory',
    component: ProductsComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: 'products/:category/:subCategory/:id',
    component: ProductDetailsComponent,
  },
  { path: 'auth', component: AuthComponent },
  {
    path: 'cart',
    component: ShoppingcartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RedirectGuard, AuthGuard],
})
export class AppRoutingModule {}
