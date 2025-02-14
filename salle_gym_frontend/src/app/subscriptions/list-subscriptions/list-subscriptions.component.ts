import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-subscriptions',
  standalone: false,
  templateUrl: './list-subscriptions.component.html',
  styleUrl: './list-subscriptions.component.css'
})
export class ListSubscriptionsComponent implements OnInit {
  subscriptions: any[] = [];
  filteredSubscriptions: any[] = [];
  searchTerm: string = '';

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getAllSubscriptions().subscribe(data => {
      this.subscriptions = data.filter(sub => sub.customer.activeSubscription);
      this.filteredSubscriptions = [...this.subscriptions];
    });
  }

  filterSubscriptions(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredSubscriptions = this.subscriptions.filter(sub =>
      `${sub.customer.firstName} ${sub.customer.lastName}`.toLowerCase().includes(term)
    );
  }

  cancelSubscription(subscriptionId: number): void {
    Swal.fire({
      title: 'Résiliation d’abonnement',
      text: 'Voulez-vous vraiment résilier cet abonnement ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, résilier',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Résiliation en cours...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        this.subscriptionService.cancelSubscription(subscriptionId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '✅ Résiliation réussie',
              text: 'L’abonnement a été résilié avec succès.',
            }).then(() => {
              this.loadSubscriptions();
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: '❌ Erreur',
              text: 'Une erreur est survenue lors de la résiliation.',
            });
          }
        });
      }
    });
  }
}
