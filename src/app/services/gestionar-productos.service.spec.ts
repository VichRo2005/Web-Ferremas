import { TestBed } from '@angular/core/testing';

import { GestionarProductosService } from './gestionar-productos.service';

describe('GestionarProductosService', () => {
  let service: GestionarProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
