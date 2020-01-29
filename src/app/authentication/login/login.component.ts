import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.authenicateUser(user).subscribe((data: any) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/manage/profile']);
        console.log('sign in successful');
      } else {
        console.log('incorret user name or password');
      }
    });
  }
}
