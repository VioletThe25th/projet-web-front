import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  signInform: FormGroup;
  auth = getAuth();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.signInform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(this.signInform.value);
    if (this.signInform.valid) {
      this.authService.signIn(this.signInform.value.email, this.signInform.value.password)
      console.log(this.signInform.value);
    }
  }

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/main']);
      } else {
        console.log("L'utilisateur n'est pas connecté")
      }
    })
  }

}
