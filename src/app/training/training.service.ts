import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';

import { Exercise } from './exercise.model';
import { State } from '../app.reducer';
import { UIService } from './../shared/ui.service';
import { UIStartLoading, UIStopLoading } from '../shared/reducers/ui.actions';

const enum DatabaseCollectionsNames {
  availableExercises = 'availableExercises',
  finishedExercises = 'finishedExercises',
}

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private _availableExercises: Exercise[] = [];
  private _runningExercise: Exercise;
  private _firebaseSubscritions: Subscription[] = [];

  public exerciseChanged = new Subject<Exercise>();
  public exercisesChanged = new Subject<Exercise[]>();
  public finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(
    private _firestore: AngularFirestore,
    private _uiService: UIService,
    private _store: Store<State>
  ) {}

  public fetchAvailableExercises(): Subscription {
    this._store.dispatch(new UIStartLoading());
    const subscription = this._firestore
      .collection(DatabaseCollectionsNames.availableExercises)
      .snapshotChanges()
      .pipe(
        map((docArray: any) => {
          return docArray.map((document: any) => {
            return {
              id: document.payload.doc.id,
              ...document.payload.doc.data(),
            } as Exercise;
          });
        })
      )
      .subscribe(
        (exercises: Exercise[]) => {
          this._store.dispatch(new UIStopLoading());
          this._availableExercises = exercises;
          this.exercisesChanged.next([...this._availableExercises]);
        },
        (error) => {
          this._store.dispatch(new UIStopLoading());
          this._uiService.showSnackBar('Fetching exercises failed', null, 3000);
          this.exercisesChanged.next(null);
        }
      );

    this._firebaseSubscritions.push(subscription);
    return subscription;
  }

  public startExercise(selectedId: string): void {
    this._firestore
      .doc(`${DatabaseCollectionsNames.availableExercises}/${selectedId}`)
      .update({ lastSelected: new Date() });

    this._runningExercise = this._availableExercises.find(
      (ex: Exercise) => ex.id === selectedId
    );

    this.exerciseChanged.next({ ...this._runningExercise });
  }

  public getRunningExercise(): Exercise {
    return { ...this._runningExercise };
  }

  public completeExercise(): void {
    this._addDataToDatabase({
      ...this._runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this._emitExerciseIsChanged();
  }

  public cancelExercise(progress: number): void {
    this._addDataToDatabase({
      ...this._runningExercise,
      duration: this._runningExercise.duration * (progress / 100),
      calories: this._runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this._emitExerciseIsChanged();
  }

  public fetchCompletedOrCancellExercises(): Subscription {
    const subscription = this._firestore
      .collection(DatabaseCollectionsNames.finishedExercises)
      .valueChanges()
      .subscribe((exercises: Exercise[]) =>
        this.finishedExercisesChanged.next(exercises)
      );
    this._firebaseSubscritions.push(subscription);
    return subscription;
  }

  private _addDataToDatabase(exercise: Exercise): void {
    this._firestore
      .collection(DatabaseCollectionsNames.finishedExercises)
      .add(exercise);
  }

  private _emitExerciseIsChanged(): void {
    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public cancelSubscriptions(): void {
    this._firebaseSubscritions.forEach((sub) => sub.unsubscribe());
  }
}
