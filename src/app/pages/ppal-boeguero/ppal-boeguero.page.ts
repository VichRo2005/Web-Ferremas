import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ppal-boeguero',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './ppal-boeguero.page.html',
  styleUrls: ['./ppal-boeguero.page.scss'],
})

export class PpalBoegueroPage implements OnInit {

  constructor(private router: Router) { }

  isDisabled = true;

  ngOnInit() { }

  irAGestionarStock() {
    this.router.navigate(['bodeguero-listarstock']);
  }

  irAGestionarDespacho() {
    this.router.navigate(['/gestionar-despacho']);
  }
}

