import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  constructor(private _snackBar: MatSnackBar) {}

  public showSnackBar(message, action, duration): void {
    this._snackBar.open(message, action, { duration });
  }
}
