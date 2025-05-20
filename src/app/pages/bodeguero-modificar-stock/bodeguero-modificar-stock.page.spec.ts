import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegueroModificarStockPage } from './bodeguero-modificar-stock.page';

describe('BodegueroModificarStockPage', () => {
  let component: BodegueroModificarStockPage;
  let fixture: ComponentFixture<BodegueroModificarStockPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegueroModificarStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
