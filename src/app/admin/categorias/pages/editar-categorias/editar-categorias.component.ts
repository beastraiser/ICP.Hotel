import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';
import { CategoriasService } from '../../services/categorias-service.service';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'categorias-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrl: './editar-categorias.component.css',
})
export class EditarCategoriasComponent {
  private categoriasService = inject(CategoriasService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  public categoria: Categoria | null = null;
  public selectedFile: File | null = null;

  constructor() {}

  ngOnInit(): void {}

  public categoriaIdForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
  });

  public categoriaEditForm: FormGroup = this.fb.group({
    tipoCamas: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    numeroCamas: ['', [Validators.required]],
    maximoPersonas: ['', [Validators.required]],
    costeNoche: ['', [Validators.required]],
  });

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  buscarCategoria(): void {
    this.categoriasService
      .obtenerCategoriaPorId(this.categoriaIdForm.get('id')!.value)
      .subscribe({
        next: (data) => {
          this.categoria = data;
          this.categoriaEditForm.patchValue({
            tipoCamas: this.categoria.tipoCamas.map((tc) => tc.tipo),
            tipo: this.categoria.tipo,
            numeroCamas: this.categoria.numeroCamas,
            maximoPersonas: this.categoria.maximoPersonas,
            costeNoche: this.categoria.costeNoche,
          });
        },
        error: (error) => {
          this.snackbar.open('Categoria no encontrada', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  guardarCambios(): void {
    if (!this.categoria) return;

    const id = this.categoria.id;
    const tipoCamas = this.categoriaEditForm
      .get('tipoCamas')
      ?.value.map((tipo: string) => ({ tipo }));
    const tipo = this.categoriaEditForm.get('tipo')?.value;
    const numeroCamas = this.categoriaEditForm.get('numeroCamas')?.value;
    const maximoPersonas = this.categoriaEditForm.get('maximoPersonas')?.value;
    const costeNoche = this.categoriaEditForm.get('costeNoche')?.value;
    const foto = this.selectedFile;

    this.categoriasService
      .actualizarCategoria(
        id,
        tipoCamas,
        tipo,
        numeroCamas,
        maximoPersonas,
        costeNoche,
        foto
      )
      .subscribe({
        next: () => {
          this.snackbar.open('Categoria actualizada', 'Cerrar', {
            duration: 3000,
          });
          this.categoria = null;
          this.categoriaIdForm.reset();
        },
        error: (error) => {
          this.snackbar.open('Error al actualizar categoria', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  borrarCategoria(): void {
    if (!this.categoria) return;

    this.categoriasService.borrarCategoria(this.categoria.id).subscribe({
      next: () => {
        this.snackbar.open('Categoria eliminada', 'Cerrar', {
          duration: 3000,
        });
        this.categoria = null;
        this.categoriaIdForm.reset();
      },
      error: (error) => {
        this.snackbar.open('Categoria eliminada', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
