import { TestBed } from '@angular/core/testing';

import { GestionarSucursalService } from './gestionar-sucursal.service';

describe('GestionarSucursalService', () => {
  let service: GestionarSucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarSucursalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
