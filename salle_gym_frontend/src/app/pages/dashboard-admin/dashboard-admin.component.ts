import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-admin',
  standalone: false,
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})

export class DashboardAdminComponent implements OnInit {
  username!: string;
  activeClients: number = 0;
  inactiveClients: number = 0;
  monthlyRevenue: number = 0;
  startDate: string = '';
  endDate: string = '';

  constructor(private dashboardService: DashboardService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    console.log("Admin connecté, Username :", this.username);
    this.getStatistics();
  }

  getStatistics() {
    this.dashboardService.getActiveClients().subscribe(count_active => {
      this.activeClients = count_active;
    });
    this.dashboardService.getInactiveClients().subscribe(count_inactive => {
      this.inactiveClients = count_inactive;
    });

    this.dashboardService.getMonthlyRevenue().subscribe(revenue => {
      this.monthlyRevenue = revenue;
    });
  }

  exportSubscriptions() {
    if (!this.startDate || !this.endDate) {
      Swal.fire({
        icon: 'warning',
        title: '📅 Période requise',
        text: 'Veuillez sélectionner une période avant d’exporter !',
      });
      return;
    }
  
    // 🔽 Vérifier si startDate est après endDate
    if (new Date(this.startDate) > new Date(this.endDate)) {
      Swal.fire({
        icon: 'error',
        title: '📅 Période invalide',
        text: 'La date de début ne peut pas être supérieure à la date de fin. Veuillez corriger.',
      });
      return;
    }
  
    Swal.fire({
      title: 'Exportation en cours...',
      text: 'Veuillez patienter',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    this.dashboardService.exportSubscriptions(this.startDate, this.endDate).subscribe(response => {
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `abonnements_${this.startDate}_${this.endDate}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
  
      Swal.fire({
        icon: 'success',
        title: '📂 Exportation réussie !',
        text: 'Le fichier a été téléchargé avec succès.',
      });
    }, error => {
      console.error("Erreur lors de l'exportation", error);
      Swal.fire({
        icon: 'error',
        title: '⚠ Erreur',
        text: 'Une erreur est survenue lors de l’exportation.',
      });
    });
  }
  

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
