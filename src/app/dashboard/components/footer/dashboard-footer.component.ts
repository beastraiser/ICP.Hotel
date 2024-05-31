import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-footer',
  templateUrl: './dashboard-footer.component.html',
  styleUrl: './dashboard-footer.component.css',
})
export class DashboardFooterComponent {
  year = new Date().getFullYear();
}
