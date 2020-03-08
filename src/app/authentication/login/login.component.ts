import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ValidationService } from '../../services//validation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    if (!this.validationService.validateLogin(user)) {
      swal('Error!', 'Please fill in all fields!', 'error');
      return false;
    }

    this.authService.authenicateUser(user).subscribe((data: any) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/manage/profile']);
      } else {
        swal('Error', 'Incorrect Username or Password', 'error');
      }
    });
  }
}
