import { Component } from '@angular/core';

@Component({
  selector: 'app-error404-page',
  template: `
    <div class="page-not-found">
      <div class="container-fluid align-content-center cuerpo">
        <h1>404 - Página no encontrada</h1>
        <p>Parece que te has perdido en el desierto del viejo oeste.</p>
        <button (click)="goHome()">Volver al Inicio</button>
      </div>
    </div>
  `,
  styleUrl: './error404-page.component.css',
})
export class Error404PageComponent {
  goHome() {
    window.location.href = '/';
  }
}
