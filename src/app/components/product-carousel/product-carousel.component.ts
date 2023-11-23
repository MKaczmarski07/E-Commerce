import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  Input,
  OnChanges,
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Item } from 'src/app/models/item';
import { LoadProductService } from 'src/app/services/load-product.service';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: [
    './product-carousel.component.scss',
    '../../../../node_modules/keen-slider/keen-slider.min.css',
  ],
})
export class ProductCarouselComponent
  implements AfterViewInit, OnDestroy, OnChanges
{
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  currentSlide: number = 0;
  slider: KeenSliderInstance | undefined;
  isLoaded = false;
  @Input() header = '';

  skeletonItems = [1, 2, 3, 4, 5, 6];
  @Input() fetchedProducts: Item[] | null = null;

  constructor(private loadProductService: LoadProductService) {}

  ngOnChanges() {
    if (this.fetchedProducts) {
      this.isLoaded = true;

      setTimeout(() => {
        {
          this.slider?.update(undefined, 0);
        }
      }, 0.1);
    }
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,
      {
        loop: true,
        breakpoints: {
          '(min-width: 500px)': {
            slides: { perView: 2.25, spacing: 15 },
          },
          '(min-width: 1023px)': {
            slides: { perView: 4.25, spacing: 15 },
          },
        },
        slides: {
          perView: 1.25,
          spacing: 15,
        },
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel;
        },
      },
      [
        (slider) => {
          let timeout: any;
          let mouseOver = false;
          function clearNextTimeout() {
            clearTimeout(timeout);
          }
          function nextTimeout() {
            clearTimeout(timeout);
            if (mouseOver) return;
            timeout = setTimeout(() => {
              slider.next();
            }, 5000);
          }
          slider.on('created', () => {
            slider.container.addEventListener('mouseover', () => {
              mouseOver = true;
              clearNextTimeout();
            });
            slider.container.addEventListener('mouseout', () => {
              mouseOver = false;
              nextTimeout();
            });
            nextTimeout();
          });
          slider.on('dragStarted', clearNextTimeout);
          slider.on('animationEnded', nextTimeout);
          slider.on('updated', nextTimeout);
        },
      ]
    );
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

  onProductClick(item: Item) {
    this.loadProductService.loadProduct(item);
  }
}
