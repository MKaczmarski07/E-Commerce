import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  @Input() name = '';
  @Input() price = 0;
  @Input() for = '';
  @Input() imageSource = '';
  src = '';
  @Input() path = '';

  ngOnInit() {
    this.setImageSource();
  }

  setImageSource() {
    this.firebaseService
      .getImageUrl(this.path)
      .then((url) => {
        this.src = url;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  constructor(private firebaseService: FirebaseService) {}
}
