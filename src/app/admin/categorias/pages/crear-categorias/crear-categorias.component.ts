import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';
import { CategoriasService } from '../../services/categorias-service.service';

@Component({
  selector: 'categorias-crear-categorias',
  templateUrl: './crear-categorias.component.html',
  styleUrl: './crear-categorias.component.css',
})
export class CrearCategoriasComponent {
  private categoriasService = inject(CategoriasService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  public selectedFile: File | null = null;

  constructor() {}

  ngOnInit(): void {}

  public createCategoriaForm: FormGroup = this.fb.group({
    tipoCamas: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    numeroCamas: ['', [Validators.required]],
    maximoPersonas: ['', [Validators.required]],
    costeNoche: ['', [Validators.required]],
  });

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  crearCategoria(): void {
    const tipoCamas = this.createCategoriaForm
      .get('tipoCamas')
      ?.value.map((tipo: string) => ({ tipo }));
    const tipo = this.createCategoriaForm.get('tipo')?.value;
    const numeroCamas = this.createCategoriaForm.get('numeroCamas')?.value;
    const maximoPersonas =
      this.createCategoriaForm.get('maximoPersonas')?.value;
    const costeNoche = this.createCategoriaForm.get('costeNoche')?.value;
    const foto = this.selectedFile;

    this.categoriasService
      .crearCategoria(
        tipoCamas,
        tipo,
        numeroCamas,
        maximoPersonas,
        costeNoche,
        foto
      )
      .subscribe({
        next: () => {
          this.snackbar.open('Categoria creada', 'Cerrar', {
            duration: 3000,
          });
          this.createCategoriaForm.reset();
        },
        error: (error) => {
          this.snackbar.open('Error al crear categoria', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }
}
