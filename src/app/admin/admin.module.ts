import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminFooterComponent } from './components/footer/admin-footer.component';
import { AdminHeaderComponent } from './components/header/admin-header.component';
import { AdminLayoutComponent } from './pages/layout/admin-layout.component';

@NgModule({
  declarations: [
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ],
})
export class AdminModule {}
