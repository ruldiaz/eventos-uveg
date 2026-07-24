import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event as EventModel } from '../../models/event.model';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  event?: EventModel;
  message = '';
  form!: FormGroup;
  submitButtonHover = false;

  private readonly minDateValidator: ValidatorFn = (control: AbstractControl) => {
    const value = control.value as string | null;

    if (!value) {
      return null;
    }

    const selected = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    return selected < today ? { pastDate: true } : null;
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      eventDate: ['', [Validators.required, this.minDateValidator]],
    });

    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(eventId).subscribe((event) => {
      this.event = event;
      if (event) {
        this.form.patchValue({
          eventDate: this.toDateInputValue(event.date),
        });
      }
    });
  }

  get controls() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.invalid || !this.event) {
      this.form.markAllAsTouched();
      return;
    }

    this.eventService.registerForEvent(this.event.id).subscribe((event) => {
      this.event = event;
      this.message = 'Registro realizado con éxito.';
      this.form.reset();
    });
  }

  private toDateInputValue(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
