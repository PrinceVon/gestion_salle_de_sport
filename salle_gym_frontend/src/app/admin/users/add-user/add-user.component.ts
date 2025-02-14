import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['ADMIN', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      Swal.fire({
        title: "Erreur",
        text: "Veuillez remplir correctement tous les champs !",
        icon: "warning",
        confirmButtonText: "OK"
      });
      return;
    }

    this.userService.addUser(this.userForm.value).subscribe(
      response => {
        Swal.fire({
          title: "Succès",
          text: "Utilisateur ajouté avec succès !",
          icon: "success",
          confirmButtonText: "OK"
        });
        this.userForm.reset();
      },
      error => {
        console.error(error);
        Swal.fire({
          title: "Erreur",
          text: "Nom déjà utilisé !",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    );
  }
}
