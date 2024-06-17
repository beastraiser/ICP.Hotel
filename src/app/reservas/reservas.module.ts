import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasHeaderComponent } from './components/header/reservas-header.component';
import { ReservasFooterComponent } from './components/footer/reservas-footer.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelPersonalPageComponent } from './pages/panel-personal-page/panel-personal-page.component';
import { ReservaCardComponent } from './components/reserva-card-component/reserva-card-component.component';
import { SharedModule } from '../shared/shared.module';
import { EditarReservaModalComponent } from './components/editar-reserva-modal/editar-reserva-modal.component';
import { InformacionPageComponent } from './pages/informacion-page/informacion-page.component';
import { ReservasLayoutComponent } from './pages/layout-page/layout-page.component';
import { CrearPageComponent } from './pages/crear-page/crear-page.component';
import { CuentaPageComponent } from './pages/cuenta-page/cuenta-page.component';
import { DateAdjustPipe } from './pipes/date-adjust.pipe';

@NgModule({
  declarations: [
    ReservasLayoutComponent,
    ReservasHeaderComponent,
    ReservasFooterComponent,
    CrearPageComponent,
    PanelPersonalPageComponent,
    ReservaCardComponent,
    EditarReservaModalComponent,
    InformacionPageComponent,
    CuentaPageComponent,
    DateAdjustPipe
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ],
  providers: [DatePipe],
})
export class ReservasModule {}
