import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  standalone: false,
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})

export class SidebarAdminComponent implements OnInit{

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }

  storedUsername: string | null = '';

  ngOnInit() {
    this.storedUsername = localStorage.getItem("username");
  }

  menuState: { [key: string]: boolean } = {
    users: false,
    account: false
  };
  
  toggleMenu(menu: string) {
    this.menuState[menu] = !this.menuState[menu];
  }
  
}


