import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-location',
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  center = { lat: -34.6037, lng: -58.3816 }; // Ej: Buenos Aires


}
