import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  public loadingStateChanged = new Subject<boolean>();
}
