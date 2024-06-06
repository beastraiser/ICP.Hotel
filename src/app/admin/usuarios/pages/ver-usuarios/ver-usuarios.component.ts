import { Component, inject } from '@angular/core';
import { UsuarioDatos } from '../../../../shared/interfaces/usuario-datos.interface';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'usuarios-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css',
})
export class VerUsuariosComponent {
  usuarios: UsuarioDatos[] = [];
  displayedColumns: string[] = ['id', 'email', 'idPerfil', 'fecha'];
  private userService = inject(UserService);

  constructor() {}

  ngOnInit(): void {
    this.userService.obtenerUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }
}
