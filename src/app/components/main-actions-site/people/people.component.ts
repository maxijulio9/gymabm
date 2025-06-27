import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from '../../../services/person.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../../../model/person';

@Component({
  selector: 'app-people',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})

export class PeopleComponent {

  @ViewChild('editPersonModal') editPersonModal!: TemplateRef<any>;
  
  private modalService = inject(NgbModal);
  private personService = inject(PersonService);
  private fb = inject(FormBuilder);


  people: Person[] = [];
  personForm: FormGroup;
  disciplines:  { id: string, name: string }[] = [
    { id: '1', name: 'Basketball' },
    { id: '2', name: 'Football' },
    { id: '3', name: 'Tennis' },
    { id: '4', name: 'Swimming' }
  ];

  constructor() {
    this.personForm = this.fb.group({
      id : [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['', Validators.required],
      height: [''],
      weight: [''],
      birthDate: ['', Validators.required],
      discipline: ['', Validators.required]
    });
  
  }
  ngOnInit() {
    this.loadPeople();
  }

  openAddPersonModal(content: any) {
    this.personForm.reset();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  savePerson( modal: any) {
    if(this.personForm.valid) {
      const newPerson: Person = {
        ...this.personForm.value,
        id: this.generateId(),
        birthDate: new Date(this.personForm.value.birthDate),
        discipline: this.personForm.value.discipline // Assuming discipline is a string ID
      }
      this.addPerson(newPerson);
      modal.close();

    }
  }

  addPerson(newPerson: Person) {
    this.personService.addPerson(newPerson).subscribe(() =>{
      this.loadPeople();
    });
   
  }
  

  loadPeople() {
    this.personService.getPeople().subscribe((person: Person[]) => {
      console.log('People data loaded:', person);
      this.people = person;
    });
  }
  
    editPerson(person: Person) {
      
        this.personForm.patchValue({
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        phone: person.phone,
        address: person.address,
        height: person.height,
        weight: person.weight,
        birthDate: person.birthDate.toISOString, // Format to YYYY-MM-DD
        discipline: person.disciplineId // Assuming disciplineId is the ID of the discipline
      });  
      this.modalService.open(this.editPersonModal, { ariaLabelledBy: 'modal-basic-title' });


    }

    updatePerson(modal: any) {
      if (this.personForm.valid) {
        const updatedPerson: Person = {
        ...this.personForm.value,
        birthDate: new Date(this.personForm.value.birthDate),
        discipline: this.personForm.value.discipline
      };

    console.log('Updating person with ID:', updatedPerson.id);
    
    this.personService.updatePerson(updatedPerson).subscribe(() => {
      this.loadPeople();
      modal.close();
    });
  }
    }

    deletePerson(id: string) {
      this.personService.deletePerson(id).subscribe(() => {
        this.loadPeople();
      } 
      );
    }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

}
