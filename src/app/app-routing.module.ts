import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, Router } from '@angular/router';
import { RedirectGuard } from './services/redirect-guard.service';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'products/:category/:subCategory',
    component: ProductsComponent,
    canActivate: [RedirectGuard],
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
  providers: [RedirectGuard],
})
export class AppRoutingModule {}
