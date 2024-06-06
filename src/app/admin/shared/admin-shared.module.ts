import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSubHeaderComponent } from './components/header/admin-shared-subheader.component';
import { MaterialModule } from '../../material/material.module';
import { AdminSharedRoutingModule } from './admin-shared-routing.module';

@NgModule({
  declarations: [AdminSubHeaderComponent],
  imports: [CommonModule, MaterialModule, AdminSharedRoutingModule],
  exports: [AdminSubHeaderComponent],
})
export class AdminSharedModule {}
