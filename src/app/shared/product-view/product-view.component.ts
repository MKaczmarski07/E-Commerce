import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent {
  @Input() name = 'Air Jordan Low Retro';
  @Input() price = 579.99;
  @Input() gender = 'men';
  @Input() type = 'Buty męskie';
}
