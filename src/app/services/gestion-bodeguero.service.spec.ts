import { TestBed } from '@angular/core/testing';

import { GestionBodegueroService } from './gestion-bodeguero.service';

describe('GestionBodegueroService', () => {
  let service: GestionBodegueroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionBodegueroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
