import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-active-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './active-filter.component.html',
  styleUrl: './active-filter.component.css',
  standalone: true,
})
export class ActiveFilterComponent {
  // tambien se puede hacer con ngModel (bidirecional) 
  // en .ts: isCheckedModel = false;
  // en .html: [(ngModel)]="isCheckedModel"

  // o con [checked]="isChecked()" (change)="onChange()" en el .html

  isChecked = signal<boolean>(false);
  title = input<string>();
  active = output<boolean>();

  onChange() {
    // setteamos la señal
    // this.isChecked.set(!this.isChecked());

    // actualizar la señal
    this.isChecked.update(isChecked => !isChecked);

    // emitimos al padre
    this.active.emit(this.isChecked());
  }
}
