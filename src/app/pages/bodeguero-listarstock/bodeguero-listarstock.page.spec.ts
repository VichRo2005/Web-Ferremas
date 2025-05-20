import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegueroListarstockPage } from './bodeguero-listarstock.page';

describe('BodegueroListarstockPage', () => {
  let component: BodegueroListarstockPage;
  let fixture: ComponentFixture<BodegueroListarstockPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegueroListarstockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
