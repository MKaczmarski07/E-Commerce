import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { SliderComponent } from './components/slider/slider.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environments';
import { provideAuth, getAuth, Auth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FavoriteItemComponent } from './components/favorite-item/favorite-item.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductViewSkeletonComponent } from './components/product-view-skeleton/product-view-skeleton.component';
import { ProductDetailSkeletonComponent } from './components/product-detail-skeleton/product-detail-skeleton.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { PaymentMethodPopupComponent } from './components/payment-method-popup/payment-method-popup.component';
import { PaymentMethodButtonComponent } from './components/payment-method-button/payment-method-button.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutProgressBarComponent } from './components/checkout-progress-bar/checkout-progress-bar.component';
import { SummaryItemComponent } from './components/summary-item/summary-item.component';
import { CheckoutAuthComponent } from './pages/checkout-auth/checkout-auth.component';
import { LoginComponent } from './components/login/login.component';
import { ProductAddedComponent } from './components/product-added/product-added.component';
import { FavoritesAddedComponent } from './components/favorites-added/favorites-added.component';
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    SliderComponent,
    ProductViewComponent,
    ProductsComponent,
    ProductDetailsComponent,
    AuthComponent,
    CartComponent,
    CartItemComponent,
    FooterComponent,
    FavoritesComponent,
    FavoriteItemComponent,
    AdminComponent,
    ProductViewSkeletonComponent,
    ProductDetailSkeletonComponent,
    ProductCarouselComponent,
    PaymentMethodPopupComponent,
    PaymentMethodButtonComponent,
    CheckoutComponent,
    CheckoutProgressBarComponent,
    SummaryItemComponent,
    CheckoutAuthComponent,
    LoginComponent,
    ProductAddedComponent,
    FavoritesAddedComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
