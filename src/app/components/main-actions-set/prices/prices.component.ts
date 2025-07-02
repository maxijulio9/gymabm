import { Component, inject, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PricesService } from '../../../services/prices.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Price } from '../../../model/prices';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prices',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css'
})
export class PricesComponent {

  private pricesService = inject(PricesService);
  pricesForm: FormGroup;
  private fb = inject(FormBuilder);
  prices: Price[] = []; 

  constructor() {
    this.pricesForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      location: ['']
    }); 
  }

  ngOnInit() {
    this.loadPrices();
  }
  onSubmit() {
    if (this.pricesForm.valid) {
      if(this.pricesForm.value.id){
        console.log('Updating price:', this.pricesForm.value);
        this.pricesService.updatePrice(this.pricesForm.value).subscribe((updatedPrice: Price) => {
          this.loadPrices();
          this.pricesForm.reset();
        });

      }else{
        console.log('Adding new price:', this.pricesForm.value);
        this.pricesService.addPrice(this.pricesForm.value).subscribe((newPrice: Price) => {
         this.loadPrices();
          this.resetForm();
        });
      }
    }
  }
      

  loadPrices(){
    this.pricesService.getPrices().subscribe((priceList: Price[] )=> {
      this.prices = priceList;
    });
  }

  editPrice(price: Price) {
    this.pricesForm.patchValue({
      id: price.id,
      name: price.name,
      description: price.description,
      price: price.price,
      location: price.location
    });
  }

  deletePrice(priceId: string) {
    if (confirm('Are you sure you want to delete this price?')) {
      this.pricesService.deletePrice(priceId).subscribe(() => {
        this.loadPrices();
      });
  }
  }

  resetForm() {
    this.pricesForm.reset();
  }


}
