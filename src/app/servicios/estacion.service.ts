import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstacionModel } from '../modelos/estacion.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EstacionService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();      
    }

    store(estacion: EstacionModel): Observable<EstacionModel> {
      return this.http.post<EstacionModel>(`${this.url}/Estaciones`,estacion, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
        
      });
    }

    getAll(): Observable<EstacionModel[]>{
      return this.http.get<EstacionModel[]>(`${this.url}/Estaciones`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    update(estacion: EstacionModel): Observable<EstacionModel> {
      return this.http.patch<EstacionModel>(`${this.url}/Estaciones/${estacion.id}`, {
        nombre: estacion.nombre,
        direccion: estacion.direccion,
        coordenada_x: estacion.coordenada_x,
        coordenada_y: estacion.coordenada_y,
        tipo: estacion.tipo
      }, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<EstacionModel[]>{
      return this.http.delete<EstacionModel[]>(`${this.url}/Estaciones/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<EstacionModel>{
      return this.http.get<EstacionModel>(`${this.url}/Estaciones/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }    

    getCount(): Observable<EstacionModel[]>{
      return this.http.get<EstacionModel[]>(`${this.url}/Estaciones/count`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
 ??????????})
????????}

}