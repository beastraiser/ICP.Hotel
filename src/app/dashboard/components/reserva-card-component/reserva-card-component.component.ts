import { Component, Input, OnInit } from '@angular/core';
import { Reserva } from '../../interfaces/reservaPost.interface';

@Component({
  selector: 'dashboard-reserva-card-component',
  templateUrl: './reserva-card-component.component.html',
  styleUrl: './reserva-card-component.component.css',
})
export class ReservaCardComponentComponent implements OnInit {
  @Input()
  public reserva!: Reserva;

  ngOnInit(): void {
    if (!this.reserva) throw Error('Usted no tiene reservas');
  }
}
