import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: [
    '../../../../node_modules/keen-slider/keen-slider.min.css',
    './slider.component.scss',
  ],
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  currentSlide: number = 0;
  sliderHeaders: string[] = [
    'Winter sale',
    'Charity campaign',
    'Save up to 55%',
    'See our new products',
  ];
  slides: string[] = [
    '../../../assets/images/slider/winterSale.jpg',
    '../../../assets/images/slider/charity.jpg',
    '../../../assets/images/slider/55.png',
    '../../../assets/images/slider/new.png',
  ];
  dotHelper: number[] = [];
  slider: KeenSliderInstance | undefined;

  constructor() {
    // prevent slider from loading more than 4 slides
    this.sliderHeaders = this.sliderHeaders.slice(0, 4);
    this.slides = this.slides.slice(0, 4);
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,
      {
        loop: true,
        breakpoints: {
          '(min-width: 768px)': {
            slides: { perView: 1, spacing: 15 },
          },
          // '(min-width: 1023px)': {
          //   slides: { perView: 4.25, spacing: 15 },
          // },
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
}
