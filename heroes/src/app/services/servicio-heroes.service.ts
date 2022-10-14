import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe-model';
import {Observable, of, Subject, timer} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable()
export class ServicioHeroesService {
  readonly url = 'http://localhost:3000/heroes';
  public heroes: HeroeModel[];
  public heroeEditar = new Subject<HeroeModel>();
  public ocultarForm = new Subject<boolean>();
  public heroeEditarInit: any;
  constructor(private http: HttpClient) {
  }
  public setHeroes(arrayHeroes: HeroeModel[]): void {
    this.heroes = arrayHeroes;
  }
  public consultarTodos(): Observable<HeroeModel[]> {
    return this.http.get<HeroeModel[]>(this.url);
  }
  public consultarHeroe(id: number): Observable<HeroeModel[]>{
    if (!id) {
      return of(this.heroes);
    }
    return this.http.get<HeroeModel[]>(`${this.url}/${id}`);
  }
  public consultarHeroePorBusqueda(busqueda: string): Observable<HeroeModel[]> {
    if (!busqueda.trim()) {
      return of(this.heroes);
    }
    return this.http.get<HeroeModel[]>(`${this.url}/?nombre=${busqueda}`).pipe(
      tap(x => x.length ?
        console.log(`found heroes matching "${busqueda}"`) :
        console.log(`no heroes matching "${busqueda}"`)),
      catchError(this.handleError( []))
    );
  }
  public modificarHeroe(data: HeroeModel): Observable<HeroeModel> {
    return this.http.put<HeroeModel>(`${this.url}/${data.id}`, data);

  }
  public aniadirHeroe(data: HeroeModel): Observable<HeroeModel> {
    return this.http.post<HeroeModel>(this.url, data);
  }
  public eliminarHeroe(id: number): Observable<HeroeModel> {
    return this.http.delete<HeroeModel>(`${this.url}/${id}`);
  }
  public setHeroeEditar(heroe: HeroeModel): void {
    this.heroeEditarInit = heroe;
    this.heroeEditar.next(heroe);
  }
  private handleError(result?: any): any {
    return (): Observable<any> => {
      return of(result as any);
    };
  }
}
