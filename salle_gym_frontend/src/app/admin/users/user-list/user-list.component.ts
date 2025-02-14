import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  editForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      id: [''],
      username: [''],
      role: ['']
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    }, error => {
      console.error("Erreur lors du chargement des utilisateurs", error);
      Swal.fire("Erreur", "Impossible de charger les utilisateurs.", "error");
    });
  }

  editUser(user: any) {
    this.selectedUser = user;
    this.editForm.patchValue({
      id: user.id,
      username: user.username,
      role: user.role
    });
  }

  cancelEdit() {
    this.selectedUser = null;
  }

  updateUser() {
    if (this.editForm.valid) {
      this.userService.updateUser(this.editForm.value).subscribe(() => {
        Swal.fire("Succès", "Utilisateur mis à jour avec succès !", "success");
        this.selectedUser = null;
        this.loadUsers(); 
      }, error => {
        if (error.status === 200) {
          Swal.fire("Succès", "Utilisateur modifié avec succès !", "success");
          this.loadUsers();
        } else {
          console.error("Erreur lors de la mise à jour", error);
        Swal.fire("Erreur", "Une erreur est survenue lors de la mise à jour.", "error");
        }
        
        
      });
    }
  }

  deleteUser(id: number) {
    Swal.fire({
      title: "Voulez-vous vraiment supprimer cet utilisateur ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire("Succès", "Utilisateur supprimé avec succès !", "success");
            this.loadUsers();
          },
          error: error => {
            if (error.status === 200) {
              Swal.fire("Succès", "Utilisateur supprimé avec succès !", "success");
              this.loadUsers();
            } else {
              console.error("Erreur lors de la suppression", error);
              Swal.fire("Erreur", "Une erreur est survenue lors de la suppression.", "error");
            }
          }
        });
      }
    });
  }
}
