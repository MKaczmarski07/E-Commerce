import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  @Input() name = '';
  @Input() price = 0;
  @Input() for = '';
  @Input() imageUrl = '';
  @Input() path = '';
  @Input() shortDes = '';

  ngOnInit() {}
}
