import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { DashboardService } from '../../../services/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  user: any = null;
  passwordForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private dashboardService: DashboardService) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
    }, error => {
      console.error("Erreur lors du chargement des informations utilisateur", error);
      Swal.fire({
        title: "Erreur",
        text: "Impossible de charger vos informations utilisateur.",
        icon: "error",
        confirmButtonText: "OK"
      });
    });
  }

  changePassword() {
    if (this.passwordForm.invalid) {
      Swal.fire({
        title: "Erreur",
        text: "Veuillez remplir correctement tous les champs !",
        icon: "warning",
        confirmButtonText: "OK"
      });
      return;
    }

    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      Swal.fire({
        title: "Erreur",
        text: "Les mots de passe ne correspondent pas !",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }

    const requestData = {
      username: this.user.username,
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword
    };

    this.dashboardService.changePassword(requestData).subscribe(
      response => {
        Swal.fire({
          title: "Succès",
          text: "Mot de passe modifié avec succès !",
          icon: "success",
          confirmButtonText: "OK"
        });
        this.passwordForm.reset();
      },
      error => {
        if (error.status === 200) {
          Swal.fire({
            title: "Succès",
            text: "Mot de passe modifié avec succès !",
            icon: "success",
            confirmButtonText: "OK"
          });
        } else {
          console.error("Erreur lors du changement de mot de passe", error, requestData);
          Swal.fire({
            title: "Erreur",
            text: "Vérifiez votre ancien mot de passe !",
            icon: "error",
            confirmButtonText: "OK"
          });
        }
      }
    );
  }
}
