import { NgClass } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [NgClass],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  title = input('XXXXXXX');
  color = input('black');

  constructor() {

  }

  calculateClass(): string {
    let myClass: string = 'card-title ';

    if (this.color() === 'red') {
      myClass += 'text-danger';
    } else if (this.color() === 'blue') {
      myClass += 'text-primary';
    } else if (this.color() === 'green') {
      myClass += 'text-success';
    } else {
      myClass += 'text-dark';
    }

    return myClass;
  }
}
