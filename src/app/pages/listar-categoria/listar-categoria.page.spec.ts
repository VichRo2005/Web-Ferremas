import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarCategoriaPage } from './listar-categoria.page';

describe('ListarCategoriaPage', () => {
  let component: ListarCategoriaPage;
  let fixture: ComponentFixture<ListarCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
