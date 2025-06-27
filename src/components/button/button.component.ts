import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  standalone: true,
})
export class ButtonComponent {
  title = input('XXXXXXX');
  color = input('black');

  onExecute = output<void>();

  constructor() {

  }

  calculateClass(): string {
    let myClass: string = 'w-100 btn ';

    if (this.color() === 'red') {
      myClass += 'btn-outline-danger';
    } else if (this.color() === 'blue') {
      myClass += 'btn-outline-primary';
    } else if (this.color() === 'green') {
      myClass += 'btn-outline-success';
    } else {
      myClass += 'btn-outline-dark';
    }

    return myClass;
  }

  buttonPressed(): void {
    this.onExecute.emit();
  }

}
