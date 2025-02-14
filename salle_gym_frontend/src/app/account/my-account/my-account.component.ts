import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-account',
  standalone: false,
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})


export class MyAccountComponent implements OnInit {
  user: any = {};
  username!: string;  
  oldPassword!: string;
  newPassword!: string;
  
  message = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.authService.getUserByUsername(this.username).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des infos', err);
      }
    });
  }

  changePassword(): void {
    if (!this.oldPassword || !this.newPassword) {
      this.message = "Les champs de mot de passe ne peuvent pas être vides.";
      return;
    }
  
    console.log('Changing password for:', this.username);
    this.authService.changePassword(
      this.username,
      this.oldPassword,
      this.newPassword
    ).subscribe({
      next: (response) => {
        console.log('Password changed successfully', response);
        this.message = "Mot de passe mis à jour avec succès !";
        this.oldPassword = '';
        this.newPassword = '';
      },
      error: (err) => {
        console.error('Erreur lors du changement de mot de passe', err);
        
        if (err.status === 200) {
          this.message = "Mot de passe mis à jour avec succès !";
        } else {
          this.message = "Une erreur est survenue.";
        }
      }
    });
  }
  
}