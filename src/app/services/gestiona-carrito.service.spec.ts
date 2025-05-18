import { TestBed } from '@angular/core/testing';

import { GestionaCarritoService } from './gestiona-carrito.service';

describe('GestionaCarritoService', () => {
  let service: GestionaCarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionaCarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
