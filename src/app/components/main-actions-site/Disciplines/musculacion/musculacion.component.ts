import { Component, inject, Inject } from '@angular/core';
import { ServiceMusculacionService } from '../../../../services/service-musculacion.service';
import { Musculacion } from '../../../../model/musculacion';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { on } from 'node:events';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-musculacion',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  standalone: true,
  templateUrl: './musculacion.component.html',
  styleUrl: './musculacion.component.css'
})
export class MusculacionComponent {


  private musculacionService = inject(ServiceMusculacionService);
  musculacionData: Musculacion[] = [];

  private fb: FormBuilder = inject(FormBuilder);
  musculacionForm: FormGroup;

  showSuccess: boolean = false;

  constructor() {
    this.musculacionForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description:[''],
      cuposDisponibles: ['', Validators.required],
      horario: [''],
      precio: ['', Validators.required],
      profesor: ['']
    });
    this.loadData();
   
  }
  
  onSubmit() {
    if (this.musculacionForm.valid) {
      if (this.musculacionForm.value.id) {
        this.musculacionService.updateMusculacionData(this.musculacionForm.value).subscribe(()=>{
          this.loadData();
          this.mostrarMensajeExito();
          this.resetForm();
         
        });
        
      }else{
        this.musculacionService.addActivityService(this.musculacionForm.value).subscribe(()=>{
          this.loadData();
          this.musculacionForm.reset();
        });
      }
    }
  }

  loadData(){
    this.musculacionService.loadMusculacionData().subscribe((data: Musculacion[]) => {
      this.musculacionData = data;
    });
  }

  editActivity(activityActual: Musculacion){
    this.musculacionForm.patchValue({
      id: activityActual.id,
      name: activityActual.name,
      description: activityActual.description,
      cuposDisponibles: activityActual.cuposDisponibles,
      horario: activityActual.horario,
      precio: activityActual.precio,
      profesor: activityActual.profesor
    });
    const el = document.getElementById('musculacionForm');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    
  }


  deleteActivity(id: string) {
   if(confirm("¿Estás seguro de que quieres eliminar esta actividad?") ==true) {
      this.musculacionService.deleteMusculacionData(id).subscribe(() => {
        this.loadData();
      });
    }
  }
  resetForm() {
    this.musculacionForm.reset();
  }

  mostrarMensajeExito() {
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 4000); 
  }

}

