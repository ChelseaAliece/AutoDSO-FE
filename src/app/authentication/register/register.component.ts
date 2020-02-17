import { Component, OnInit } from '@angular/core';
import { throwStatement } from '@babel/types';
import { ValidationService } from '../../services//validation.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(
    private validationService: ValidationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    if (!this.validationService.validateRegister(user)) {
      console.log('please fill in all fields');
      return false;
    }

    if (!this.validationService.validateEmail(user.email)) {
      console.log('please fill email correctly');
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if ((data as any).success) {
        console.log('You are now registered');
        this.router.navigate(['/login']);
      } else {
        console.log('You are not registered');
        this.router.navigate(['/register']);
      }
    });
  }
}
