import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event as EventModel } from '../../models/event.model';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventListComponent {
  events: EventModel[] = [];

  constructor(private eventService: EventService) {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });
  }
}
