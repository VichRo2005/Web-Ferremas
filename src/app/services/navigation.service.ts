import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) { }

  goTo(path: string): void {
    this.router.navigate([path]);
  }

  goToLogin(): void {
    this.goTo('/login');
  }

  // Puedes agregar goToAdmin(), goToBodeguero(), etc. más adelante
}
