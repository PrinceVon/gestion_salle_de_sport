import { Component, OnInit } from '@angular/core';
import { PackService } from '../../services/pack.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-offers',
  standalone: false,
  templateUrl: './list-offers.component.html',
  styleUrl: './list-offers.component.css'
})

export class ListOffersComponent implements OnInit {
  packs: any[] = [];
  selectedPack: any = {};

  constructor(private packService: PackService) {}

  ngOnInit(): void {
    this.loadPacks();
  }

  loadPacks(): void {
    this.packService.getPacks().subscribe({
      next: (data) => {
        this.packs = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des packs', err);
      }
    });
  }

  editPack(pack: any): void {
    this.selectedPack = { ...pack };
  }

  updatePack(): void {
    if (this.selectedPack.id) {
      this.packService.updatePack(this.selectedPack.id, this.selectedPack).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Pack modifié avec succès !',
            timer: 1000,
            showConfirmButton: false
          });
          
          this.loadPacks();
        },
        error: (err) => {
          console.error('Erreur lors de la modification', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Ce nom de pack est déjà utilisé. Veuillez en choisir un autre.',
          });
        }
      });
    }
  }

  deletePack(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer ce pack ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.packService.deletePack(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Supprimé',
              text: 'Pack supprimé avec succès !',
              timer: 1000,
              showConfirmButton: false
            });
            this.loadPacks();
          },
          error: (err) => {
            console.error('Erreur lors de la suppression', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Ce pack ne peut pas être supprimé car des utilisateurs y ont déjà souscrit. Résiliez-les et réessayez.'
            });
          }
        });
      }
    });
  }
}
