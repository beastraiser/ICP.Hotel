import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-shared-subheader',
  templateUrl: './admin-shared-subheader.component.html',
  styleUrl: './admin-shared-subheader.component.css',
})
export class AdminSubHeaderComponent {
  @Input()
  rutas!: { path: string; label: string }[];

  @Input()
  modulo!: string;

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
