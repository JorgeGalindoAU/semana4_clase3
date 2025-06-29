import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { ButtonComponent } from "../../components/button/button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  imports: [TitleComponent, ButtonComponent, RouterLink],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css',
  standalone: true,
})
export class MainScreenComponent implements OnInit, OnDestroy {


  constructor() {
    // inicializar las variables
    // inject --> inyectar los servicios (por ejemplo, API CHRONOS)
  }

  ngOnInit(): void {
    // mostrar un loading
    // llamar a nuestra API por HTTP
  }

  ngOnDestroy(): void {
    // unsubscribe de un observable
  }

  showMore() {
    console.log("Show more!");
  }
  explore() {
    console.log("Explore!");
  }
  configure() {
    console.log("Configure!");
  }
}
