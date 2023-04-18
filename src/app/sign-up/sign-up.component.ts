import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { AngularFirestore,  } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm: FormGroup;
  auth = getAuth();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private store: AngularFirestore){
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      nickName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(){
    if (this.signUpForm.valid && this.signUpForm.value.password === this.signUpForm.value.confirmPassword) {
      console.log(this.signUpForm.value);
      this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password);
      // (this.store.collection('users').add(this.signUpForm.value));
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
