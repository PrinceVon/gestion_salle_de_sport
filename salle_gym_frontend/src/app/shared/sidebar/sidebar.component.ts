import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})


export class SidebarComponent {
  user: any;
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.username = localStorage.getItem("username");
   }

  logout() {
    localStorage.removeItem('token');
    this.authService.logout();
  }

  menuState: { [key: string]: boolean } = {
    clients: false,
    offres: false,
    abonnements: false
  };
  
  toggleMenu(menu: string) {
    this.menuState[menu] = !this.menuState[menu];
  }
  
}

