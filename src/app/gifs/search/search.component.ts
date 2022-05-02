import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {

  }

  buscar() {
    const value = this.txtBuscar.nativeElement.value;

    if (value.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs(value);
    this.txtBuscar.nativeElement.value = '';
  }

}
