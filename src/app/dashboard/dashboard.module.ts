import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './pages/layout/dahsboard-layout.component';
import { DashboardHeaderComponent } from './components/header/dashboard-header.component';
import { DashboardFooterComponent } from './components/footer/dashboard-footer.component';
import { ReservasPageComponent } from './pages/reservas-page/reservas-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    ReservasPageComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
