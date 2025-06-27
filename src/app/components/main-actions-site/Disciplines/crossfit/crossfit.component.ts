import { Component, inject } from '@angular/core';
import { Crossfit } from '../../../../model/crossfit';
import { CrossfitService } from '../../../../services/crossfit.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crossfit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crossfit.component.html',
  styleUrl: './crossfit.component.css'
})
export class CrossfitComponent {



  private crossfitService = inject(CrossfitService);
  private fb: FormBuilder = inject(FormBuilder);  
  crossfit: Crossfit[] = [];

  activityForm: FormGroup;

  constructor() {

    this.activityForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      cuposDisponibles: ['', Validators.required],
      precio: ['', Validators.required],
      profesor: ['', Validators.required]
    });

  }
  

  ngOnInit() {
    this.loadCrossfitData();
  }

  loadCrossfitData() {
    this.crossfitService.loadCrossfitData().subscribe((data: Crossfit[]) => {
      this.crossfit = data;
    });
  }

  onSubmit() {
    console.log(this.activityForm.value);


    if (this.activityForm.valid) {

      const activityActual = this.activityForm.value;
      if (activityActual.id) {
        this.crossfitService.updateCrossfitActivity(activityActual).subscribe(() => {
          this.loadCrossfitData();
          this.activityForm.reset();
        });
      }else{
        this.crossfitService.addCrossfitActivity(activityActual).subscribe(() => {
          this.loadCrossfitData();
          this.activityForm.reset();
        });
      }
    }
  }


  generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }


  deleteActivity(id: string) {
    this.crossfitService.deleteCrossfitActivity(id).subscribe(()=>{
      this.loadCrossfitData();
    })

  }


  editActivity(activity: Crossfit) {
    this.activityForm.setValue({
      id: activity.id,
      name: activity.name,
      description: activity.description,
      cuposDisponibles: activity.cuposDisponibles,
      precio: activity.precio,
      profesor: activity.profesor
    });


  } 

  

}
