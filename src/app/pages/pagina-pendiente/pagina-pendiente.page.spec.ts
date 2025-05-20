import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaPendientePage } from './pagina-pendiente.page';

describe('PaginaPendientePage', () => {
  let component: PaginaPendientePage;
  let fixture: ComponentFixture<PaginaPendientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPendientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
