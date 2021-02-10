import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  constructor(private _snackBar: MatSnackBar) {}

  public showSnackBar(message, action, duration): void {
    this._snackBar.open(message, action, { duration });
  }
}
