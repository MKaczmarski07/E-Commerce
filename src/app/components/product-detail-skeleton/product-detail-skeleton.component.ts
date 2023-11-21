import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail-skeleton',
  templateUrl: './product-detail-skeleton.component.html',
  styleUrls: [
    './product-detail-skeleton.component.scss',
    '../../shared/skeleton.scss',
  ],
})
export class ProductDetailSkeletonComponent implements OnInit {
  sizeSkeletons: number[] = [];

  ngOnInit(): void {
    this.initSkeletonItems();
  }

  initSkeletonItems() {
    this.sizeSkeletons = Array(18).fill(0);
  }
}
