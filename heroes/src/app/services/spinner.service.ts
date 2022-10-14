import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private appState: AppStateService) { }
  showSpinner(): void {
    this.appState.showSpinner.icon = true;
  }
  hideSpinner(): void {
    this.appState.showSpinner.icon = false;
  }
}
