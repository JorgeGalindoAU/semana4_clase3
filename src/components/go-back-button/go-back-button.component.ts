import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-go-back-button',
  imports: [],
  templateUrl: './go-back-button.component.html',
  styleUrl: './go-back-button.component.css',
  standalone: true,
})
export class GoBackButtonComponent {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
