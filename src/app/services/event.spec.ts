import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { EventService } from './event.service';

describe('Event', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return events', async () => {
    const events = await firstValueFrom(service.getEvents());
    expect(events.length).toBeGreaterThan(0);
  });
});
