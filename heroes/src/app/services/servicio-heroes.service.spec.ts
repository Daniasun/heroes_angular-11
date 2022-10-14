import { TestBed} from '@angular/core/testing';
import { ServicioHeroesService } from './servicio-heroes.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
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
});
