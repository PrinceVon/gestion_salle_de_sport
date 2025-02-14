import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;


  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    if (localStorage.getItem('username')) {
      localStorage.removeItem('username');
    }
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
  
        const role = response.role;
        const username = response.username;
  
        if (role === 'GERANT') {
          this.router.navigate([`/dashboard-gerant/${username}`]);
        } else if (role === 'ADMIN') {
          this.router.navigate([`/dashboard-admin/${username}`]);
        }
      },
      error: () => {
        this.errorMessage = 'Identifiants incorrects.';
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  
  
}

