import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './pages/layout/dahsboard-layout.component';
import { DashboardHeaderComponent } from './components/header/dashboard-header.component';
import { DashboardFooterComponent } from './components/footer/dashboard-footer.component';
import { ReservasPageComponent } from './pages/reservas-page/reservas-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelPersonalPageComponent } from './pages/panel-personal-page/panel-personal-page.component';
import { ReservaCardComponentComponent } from './components/reserva-card-component/reserva-card-component.component';
import { SharedModule } from '../shared/shared.module';
import { EditarReservaModalComponent } from './components/editar-reserva-modal/editar-reserva-modal.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    ReservasPageComponent,
    PanelPersonalPageComponent,
    ReservaCardComponentComponent,
    EditarReservaModalComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [DatePipe],
})
export class DashboardModule {}
