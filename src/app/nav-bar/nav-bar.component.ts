import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(public AuthService: AuthService, private router: Router){}

  siginInClicked() {
    this.router.navigate([''])
  }

  disconnectedClicked() {
    this.router.navigate([''])
  }
}
