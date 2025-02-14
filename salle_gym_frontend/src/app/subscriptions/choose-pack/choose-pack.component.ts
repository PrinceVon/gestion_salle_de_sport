import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackService } from '../../services/pack.service';
import { SubscriptionService } from '../../services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-choose-pack',
  standalone: false,
  templateUrl: './choose-pack.component.html',
  styleUrl: './choose-pack.component.css'
})
export class ChoosePackComponent implements OnInit {
  packs: any[] = [];
  customerId!: number;

  constructor(
    private packService: PackService,
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('customerId'));
    this.loadPacks();
  }

  loadPacks(): void {
    this.packService.getPacks().subscribe(data => {
      this.packs = data;
    });
  }

  subscribeToPack(packId: number): void {
    Swal.fire({
      title: 'Confirmer la souscription',
      text: 'Voulez-vous vraiment souscrire à ce pack ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, souscrire !',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Souscription en cours...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        this.subscriptionService.subscribeCustomer(this.customerId, packId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '✅ Souscription réussie !',
              text: 'Le client a bien été abonné.',
            }).then(() => {
              this.router.navigate(['/clients/liste']);
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: '❌ Erreur',
              text: 'Une erreur est survenue lors de la souscription.',
            });
          }
        });
      }
    });
  }
}
