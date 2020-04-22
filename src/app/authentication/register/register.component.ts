import { Component, OnInit } from '@angular/core';
import { throwStatement } from '@babel/types';
import { ValidationService } from '../../services//validation.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  role: string;
  organization: string;
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
      role: this.role,
      organization: this.organization,
      email: this.email,
      password: this.password
    };

    if (this.validatePassword() === false) {
      return false;
    }

    if (!this.validationService.validateRegister(user)) {
      swal('Error!', 'Please fill in all fields!', 'error');
      return false;
    }

    if (!this.validationService.validateEmail(user.email)) {
      swal('Error!', 'Please fill in email correctly!', 'error');
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if ((data as any).success) {
        swal('Success!', 'Your are registered! Please log in.', 'Success');

        this.router.navigate(['/login']);
      } else {
        swal(
          'Error',
          'There is already a user registered with that email. Please log in!',
          'error'
        );
        this.router.navigate(['/register']);
      }
    });
  }

  validatePassword() {
    if (this.password !== undefined) {
      if (this.password.length < 8) {
        swal('Error', 'Password must contain more than 8 characters!', 'error');
        return false;
      } else {
        return true;
      }
    }
  }
}
