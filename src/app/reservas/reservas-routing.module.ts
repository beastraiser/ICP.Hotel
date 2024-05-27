import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasLayoutsComponent } from './layouts/reservas-layouts/reservas-layouts.component';

const routes: Routes = [
  {
    path: '',
    component: ReservasLayoutsComponent,
    // children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservasRoutingModule {}
