import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // <- Agregar esto

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],  // <- Agregar CommonModule aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }
}