import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.setMaxWidth();
  }

  setMaxWidth() {
    const el = document.querySelector('.mainContent') as HTMLElement;
    if (el) {
      const elWidth = el.getBoundingClientRect().width;
      el.style.maxWidth = `${elWidth}px`;
    }
  }
}
