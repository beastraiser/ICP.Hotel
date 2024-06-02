import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reserva } from '../../interfaces/reservaPost.interface';

@Component({
  selector: 'dashboard-reserva-card-component',
  templateUrl: './reserva-card-component.component.html',
  styleUrl: './reserva-card-component.component.css',
})
export class ReservaCardComponentComponent implements OnInit {
  @Input()
  public reserva!: Reserva;
  public reservaButtons!: boolean;

  @Output() cancelar = new EventEmitter<number>();

  ngOnInit(): void {
    if (!this.reserva) throw Error('Usted no tiene reservas');
  }

  onCancelarReserva() {
    this.cancelar.emit(this.reserva.id);
  }
}
