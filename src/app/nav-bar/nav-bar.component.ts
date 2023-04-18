import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  auth = getAuth();
  isConnected: boolean = false;

  constructor(public AuthService: AuthService, private router: Router){}

  siginInClicked() {
    this.router.navigate([''])
  }

  disconnectedClicked() {
    this.router.navigate(['/main']);
    this.AuthService.disconnect();
  }

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    })
  }
}
