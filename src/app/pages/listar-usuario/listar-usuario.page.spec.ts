import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarUsuarioPage } from './listar-usuario.page';

describe('ListarUsuarioPage', () => {
  let component: ListarUsuarioPage;
  let fixture: ComponentFixture<ListarUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
