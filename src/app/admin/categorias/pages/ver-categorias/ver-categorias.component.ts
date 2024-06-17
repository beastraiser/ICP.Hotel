import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../interfaces/categoria.interface';
import { CategoriasService } from '../../services/categorias-service.service';

@Component({
  selector: 'categorias-ver-categorias',
  templateUrl: './ver-categorias.component.html',
  styleUrl: './ver-categorias.component.css',
})
export class VerCategoriasComponent {
  categorias: Categoria[] = [];
  displayedColumns: string[] = [
    'id',
    'tipoCamas',
    'tipo',
    'numeroCamas',
    'maximoPersonas',
    'costeNoche',
    'foto',
  ];
  private categoriasService = inject(CategoriasService);
  private snackbar = inject(MatSnackBar);

  constructor() {}

  ngOnInit(): void {
    this.categoriasService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error) => {
        this.snackbar.open('No hay categorias', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
