import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcommerceCompraFallidaPage } from './ecommerce-compra-fallida.page';

describe('EcommerceCompraFallidaPage', () => {
  let component: EcommerceCompraFallidaPage;
  let fixture: ComponentFixture<EcommerceCompraFallidaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceCompraFallidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
