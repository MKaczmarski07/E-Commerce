import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
})
export class SummaryItemComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() shortDes = '';
  @Input() price = 0;
  @Input() size = '';
  @Input() imageUrl = '';
  @Input() quantity = 0;
  @Input() discountPrice: number | undefined = undefined;
}
