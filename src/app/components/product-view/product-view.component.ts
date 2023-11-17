import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent {
  @Input() name = '';
  @Input() price = 0;
  @Input() for = '';
  @Input() imageUrl = '';
  @Input() path = '';
  @Input() shortDes = '';
  @Input() isBestSeller: boolean | undefined = undefined;
  @Input() discountPrice: number | undefined = undefined;
}
