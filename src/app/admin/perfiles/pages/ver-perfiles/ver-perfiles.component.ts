import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Perfil } from '../../interfaces/perfil.interface';
import { PerfilesService } from '../../services/perfiles-service.service';

@Component({
  selector: 'perfiles-ver-periles',
  templateUrl: './ver-perfiles.component.html',
  styleUrl: './ver-perfiles.component.css',
})
export class VerPerfilesComponent {
  perfiles: Perfil[] = [];
  displayedColumns: string[] = ['id', 'tipo'];
  private perfilService = inject(PerfilesService);
  private snackbar = inject(MatSnackBar);

  constructor() {}

  ngOnInit(): void {
    this.perfilService.obtenerPerfiles().subscribe({
      next: (data) => {
        this.perfiles = data;
      },
      error: (error) => {
        this.snackbar.open('No existen perfiles', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
