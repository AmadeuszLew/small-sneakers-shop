import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription:Subscription;
  isAuthenticated=false;
  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
    this.userSubscription=this.authService.user.subscribe(user=>{
      this.isAuthenticated=!user? false:true;
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
