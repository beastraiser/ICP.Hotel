import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSubHeaderComponent } from './components/header/admin-shared-subheader.component';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminSubHeaderComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [AdminSubHeaderComponent],
})
export class AdminSharedModule {}
