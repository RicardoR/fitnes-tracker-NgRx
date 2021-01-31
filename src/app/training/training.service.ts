import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private _availableExercises: Exercise[] = [];
  private _runningExercise: Exercise;
  private _exercisesDone: Exercise[] = [];

  public exerciseChanged = new Subject<Exercise>();

  constructor(private _firestore: AngularFirestore) {}

  public fetchAvailableExercises(): Observable<Exercise[]> {
    return this._firestore
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray: any) => {
          return docArray.map((document: any) => {
            return {
              id: document.payload.doc.id,
              ...document.payload.doc.data(),
            } as Exercise;
          });
        }),
        tap((exercises: Exercise[]) => (this._availableExercises = exercises))
      );
  }

  public startExercise(selectedId: string): void {
    this._runningExercise = this._availableExercises.find(
      (ex: Exercise) => ex.id === selectedId
    );

    this.exerciseChanged.next({ ...this._runningExercise });
  }

  public getRunningExercise(): Exercise {
    return { ...this._runningExercise };
  }

  public completeExercise(): void {
    this._exercisesDone.push({
      ...this._runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public cancelExercise(progress: number): void {
    this._exercisesDone.push({
      ...this._runningExercise,
      duration: this._runningExercise.duration * (progress / 100),
      calories: this._runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public getCompletedOrCancellExercises(): Exercise[] {
    return this._exercisesDone.slice();
  }
}
