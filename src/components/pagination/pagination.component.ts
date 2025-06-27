import { NgClass } from '@angular/common';
import { Component, input, OnChanges, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class Pagination implements OnInit, OnChanges {
  totalPages = signal<number[]>([]);
  currentPage = signal<number>(1);
  currentCount = signal<number>(1);

  numberOfPages = input<number>(1);
  selectedPage = output<number>();
  selectedCount = output<number>();

  constructor() {
  }

  ngOnInit(): void {
    this.initializeTotalPages();
  }

  ngOnChanges() {
    this.initializeTotalPages();
  }

  initializeTotalPages() {
    let pageArray = Array.from({ length: this.numberOfPages() }, (_, i) => i + 1);
    this.totalPages.set(pageArray);
  }

  selectPage(page: number) {
    // emitir nuevo evento (nueva página seleccionada) al padre
    this.selectedPage.emit(page);

    // seteamos la señal para mostrar por pantalla
    this.currentPage.set(page);
  }

  selectCount(count: number) {
    this.selectPage(1);

    this.selectedCount.emit(count);
    this.currentCount.set(count);
  }

  addPage() {
    let newCurrentPage = this.currentPage().valueOf() + 1;

    if (newCurrentPage <= this.totalPages().length) {
      this.currentPage.update(page => ++page);
      this.selectedPage.emit(this.currentPage());
    }

  }

  substractPage() {
    let newCurrentPage = this.currentPage().valueOf() - 1;

    if (newCurrentPage > 0) {
      this.currentPage.update(page => --page);
      this.selectedPage.emit(this.currentPage());
    }
  }
}

