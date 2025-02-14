import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-gerant',
  standalone: false,
  templateUrl: './dashboard-gerant.component.html',
  styleUrl: './dashboard-gerant.component.css'
})


export class DashboardGerantComponent implements OnInit {
  username!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    console.log("Gérant connecté, Username :", this.username);
  }
}








