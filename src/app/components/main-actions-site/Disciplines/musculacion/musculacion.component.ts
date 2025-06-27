import { Component, inject, Inject } from '@angular/core';
import { ServiceMusculacionService } from '../../../../services/service-musculacion.service';
import { Musculacion } from '../../../../model/musculacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-musculacion',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './musculacion.component.html',
  styleUrl: './musculacion.component.css'
})
export class MusculacionComponent {

  private musculacionService = inject(ServiceMusculacionService);
  musculacionData: Musculacion[] = [];

  constructor() {
    this.loadData();
   
  }
  
  loadData(){
    this.musculacionService.loadMusculacionData().subscribe((data: Musculacion[]) => {
      this.musculacionData = data;
    });
  }



}
