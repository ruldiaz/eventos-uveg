import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event as EventModel } from '../../models/event.model';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetailComponent {
  event?: EventModel;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(eventId).subscribe((event) => {
      this.event = event;
    });
  }

  isFull(): boolean {
    return this.event ? this.event.registeredCount >= this.event.capacity : true;
  }

  quickRegister(): void {
    if (!this.event || this.isFull()) {
      this.message = 'No hay lugares disponibles para este evento.';
      return;
    }

    this.eventService.registerForEvent(this.event.id).subscribe((event) => {
      this.event = event;
      this.message = 'Inscripción rápida realizada con éxito.';
    });
  }
}
