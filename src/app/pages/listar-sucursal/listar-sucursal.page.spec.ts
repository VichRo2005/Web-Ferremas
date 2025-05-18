import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarSucursalPage } from './listar-sucursal.page';

describe('ListarSucursalPage', () => {
  let component: ListarSucursalPage;
  let fixture: ComponentFixture<ListarSucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
