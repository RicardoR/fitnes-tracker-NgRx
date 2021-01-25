import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private _availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];
  private _runningExercise: Exercise;
  public exerciseChanged = new Subject<Exercise>();

  public getAvailableExercises() {
    return this._availableExercises.slice();
  }

  public startExercise(selectedId: string) {
    this._runningExercise = this._availableExercises.find(
      (ex: Exercise) => ex.id === selectedId
    );

    this.exerciseChanged.next({ ...this._runningExercise });
  }
}
