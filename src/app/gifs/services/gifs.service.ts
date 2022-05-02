import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey = 'YOUR KEY HERE';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public results: Gif[] = [];

  constructor(private http: HttpClient) {
    //Si el historial retorna null retornamos un array vacio.
    // Usamos el ! para ignorar la nullabilidad.
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('gifs')!) || [];
  }

  get historial() {
    return [...this._historial];
  }

  //async para await
  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', 10);
    //params:params se puede pasar a params
    this.http
      .get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        console.log(resp);
        this.results = resp.data;
        localStorage.setItem('gifs', JSON.stringify(this.results));
      });

    // fetch(
    //   'YOUR KEY HERE'
    // ).then((resp) => {
    //   resp.json().then((data) => {
    //     console.log(data);
    //   });
    // });
    // const resp = await fetch(
    //   'YOUR KEY HERE'
    // );
    // const data = await resp.json();

    console.log(this._historial);
  }
}
