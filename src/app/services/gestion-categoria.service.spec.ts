import { TestBed } from '@angular/core/testing';

import { GestionCategoriaService } from './gestion-categoria.service';

describe('GestionCategoriaService', () => {
  let service: GestionCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
