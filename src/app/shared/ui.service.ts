import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  public loadingStateChanged = new Subject<boolean>();

  constructor(private _snackBar: MatSnackBar) {}

  public showSnackBar(message, action, duration): void {
    this._snackBar.open(message, action, { duration });
  }
}
