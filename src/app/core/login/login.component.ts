import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Login: boolean = true;
  Register: boolean = false;

  signupForm: FormGroup;

  constructor(public auth: AuthService,
              public fb: FormBuilder
  ) {
  }

  ngOnInit() {

    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]
      ],
    });

  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  signup() {
    return this.auth.emailSignUp(this.email.value, this.password.value);
  }

  register() {
    return this.auth.registerNewUser(this.email.value, this.password.value);
  }

  registerToogle(): void {
    this.Login = false;
    this.Register = true;
  }

  loginToogle(): void {
    this.Login = true;
    this.Register = false;
  }

}
