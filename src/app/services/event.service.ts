import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event as EventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: EventModel[] = [
    {
      id: 1,
      title: 'Conferencia de Tecnología 2026',
      description: 'Explora las últimas tendencias en IA y desarrollo web con expertos de la industria.',
      date: new Date('2026-08-15'),
      location: 'Centro de Convenciones UVEG',
      capacity: 200,
      registeredCount: 145,
      category: 'Tecnología'
    },
    {
      id: 2,
      title: 'Taller de Angular Avanzado',
      description: 'Aprende técnicas avanzadas de Angular, TypeScript y desarrollo de aplicaciones escalables.',
      date: new Date('2026-08-25'),
      location: 'Aula Virtual UVEG',
      capacity: 50,
      registeredCount: 32,
      category: 'Programación'
    },
    {
      id: 3,
      title: 'Networking Profesional UVEG',
      description: 'Conecta con profesionales, comparte experiencias y expande tu red de contactos.',
      date: new Date('2026-09-05'),
      location: 'Salón de Eventos UVEG',
      capacity: 100,
      registeredCount: 78,
      category: 'Networking'
    },
    {
      id: 4,
      title: 'Hackathon de Innovación',
      description: '24 horas de creatividad y desarrollo para resolver problemas reales con tecnología.',
      date: new Date('2026-09-20'),
      location: 'Laboratorios UVEG',
      capacity: 80,
      registeredCount: 45,
      category: 'Innovación'
    }
  ];

  getEvents(): Observable<EventModel[]> {
    return of(this.events);
  }

  getEventById(id: number): Observable<EventModel | undefined> {
    const event = this.events.find((e) => e.id === id);
    return of(event);
  }

  registerForEvent(eventId: number): Observable<EventModel | undefined> {
    const event = this.events.find((e) => e.id === eventId);
    if (event && event.registeredCount < event.capacity) {
      event.registeredCount++;
    }
    return of(event);
  }

  isEventFull(eventId: number): boolean {
    const event = this.events.find((e) => e.id === eventId);
    return event ? event.registeredCount >= event.capacity : true;
  }
}
