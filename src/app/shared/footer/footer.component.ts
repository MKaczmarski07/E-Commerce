import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  year = 0;

  ngOnInit(): void {
    this.year = this.getYear();
  }

  getYear() {
    return new Date().getFullYear();
  }
}
