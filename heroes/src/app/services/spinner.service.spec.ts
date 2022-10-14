import {inject, TestBed} from '@angular/core/testing';
import {SpinnerService} from './spinner.service';
import {AppStateService} from './app-state.service';
describe('SpinnerService', () => {
  let service: SpinnerService;
  let httpClientSpy: { get: jasmine.Spy };
  let appStateService: AppStateService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [
      SpinnerService,
      AppStateService
    ]
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SpinnerService(httpClientSpy as any);
  });
  beforeEach(inject([AppStateService], s => {
    appStateService = s;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SpinnerService(httpClientSpy as any);
  }));
  it('created', () => {
    expect(service).toBeTruthy();
    expect(appStateService.showSpinner.icon).toEqual(false);
    appStateService.showSpinner.icon = true;
    expect(appStateService.showSpinner.icon).toEqual(true);
  });
});
