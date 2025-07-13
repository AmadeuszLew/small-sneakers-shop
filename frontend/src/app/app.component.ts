import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthorizationService){}
  title = 'small-sneakers-shop';
  
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}