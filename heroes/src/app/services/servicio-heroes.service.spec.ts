import {async, TestBed} from '@angular/core/testing';
import { ServicioHeroesService } from './servicio-heroes.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {HeroeModel} from '../models/heroe-model';
import {of} from 'rxjs';

describe('ServicioHeroesService', () => {
  let service: ServicioHeroesService;
  let httpClientSpy: { get: jasmine.Spy };

  const mockHeroes = [
    {id: 1, nombre : 'Superman'},
    {id: 2, nombre : 'Spiderman'},
    {id: 3, nombre : 'Batman'},
    {id: 4, nombre : 'Manolito el fuerte'},
    {id: 5, nombre : 'Hulk'},
    {id: 6, nombre : 'IronMan'},
    {id: 7, nombre : 'Goku'}
  ];
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
    ],
    providers: [
      ServicioHeroesService,
      HttpClientTestingModule
    ]
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ServicioHeroesService(httpClientSpy as any);
  });

  it('created', () => {
    expect(service).toBeTruthy();
  });

  it('setHeroes() set the heroes at the service', () => {
    httpClientSpy.get.and.returnValue(of(mockHeroes));
    service.setHeroes(mockHeroes);
    expect(service.heroes).toEqual(mockHeroes);
  });
  it('consultarTodos() should return Observable', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockHeroes));
    service.consultarTodos().subscribe(result => {
      expect(result).toEqual(mockHeroes);
      done();
    });
  });
  it('consultarTodos() should return Observable', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockHeroes));
    service.consultarTodos().subscribe(result => {
      expect(result).toEqual(mockHeroes);
      done();
    });
  });
  //
  // it(' get heroes', async(() => {
  //   const service: ServicioHeroesService = TestBed.get(ServicioHeroesService);
  //   const response: HeroeModel[] = [];
  //   spyOn(service, 'getAll').and.returnValue(of(response));
  //   service.heroes = response;
  //   expect(service.heroes).toEqual(response);
  // }));
  //
  // it(' set heroes', () => {
  //   const service: ServicioHeroesService = TestBed.get(ServicioHeroesService);
  //   service.setHeroes(mockHeroes);
  //   expect(service.heroes).toEqual(mockHeroes);
  // });
  //
  // it(' consultar Todos', () => {
  //   const service: ServicioHeroesService = TestBed.get(ServicioHeroesService);
  //   service.setHeroes(mockHeroes);
  //   expect(service.consultarTodos()).toEqual(mockHeroes);
  // });
  // it(' consultar Heroe', () => {
  //   const service: ServicioHeroesService = TestBed.get(ServicioHeroesService);
  //   service.setHeroes(mockHeroes);
  //   expect(service.consultarHeroe(1)).toEqual([mockHeroes[0]]);
  // });
  // it(' consultar Heroe no devuelve', () => {
  //   const service: ServicioHeroesService = TestBed.get(ServicioHeroesService);
  //   service.setHeroes(mockHeroes);
  //   expect(service.consultarHeroe(10)).toEqual([]);
  // });
  // it(' consultar Heroe Por Busqueda', () => {
  //   const service: ServicioHeroesService = TestBed.get(ServicioHeroesService);
  //   service.setHeroes(mockHeroes);
  //   expect(service.consultarHeroePorBusqueda('Super')).toEqual([mockHeroes[0]]);
  // });
  // it(' modificar Heroe', () => {
  //   const service: ServicioHeroesService = TestBed.get(ServicioHeroesService);
  //   const modificado = {id: 1, nombre : 'Superman Modificado'}
  //   service.setHeroes(mockHeroes);
  //   service.modificarHeroe(modificado);
  //   expect(service.consultarHeroePorBusqueda('Modificado')).toEqual([modificado]);
  // });
  // it(' eliminar Heroe', () => {
  //   const service: ServicioHeroesService = TestBed.get(ServicioHeroesService);
  //   service.setHeroes(mockHeroes);
  //   service.eliminarHeroe(7);
  //   expect(service.heroes.length).toEqual(mockHeroes.length);
  // });
  // it(' añadir Heroe', () => {
  //   const service: ServicioHeroesService = TestBed.get(ServicioHeroesService);
  //   service.setHeroes(mockHeroes);
  //   service.aniadirHeroe({id: 8, nombre : 'Pepe'});
  //   expect(service.heroes.length).toEqual(mockHeroes.length);
  // });
  // it(' setHeroeEditar', () => {
  //   const service: ServicioHeroesService = TestBed.get(ServicioHeroesService);
  //   service.setHeroeEditar(mockHeroes[0])
  //   expect(service.heroeEditarInit).toEqual(mockHeroes[0]);
  // });
});
