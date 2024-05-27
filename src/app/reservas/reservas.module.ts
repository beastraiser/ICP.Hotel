import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasLayoutsComponent } from './layouts/reservas-layouts/reservas-layouts.component';

@NgModule({
  declarations: [ReservasLayoutsComponent],
  imports: [CommonModule, ReservasRoutingModule],
})
export class ReservasModule {}
