import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  showSpinner = {
    icon: false
  };
  constructor() {}
}
