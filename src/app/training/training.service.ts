import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromUIActions from '../shared/reducers/ui.actions';
import { UIService } from './../shared/ui.service';
import { Exercise } from './models/exercise.model';
import * as TrainingActions from './reducers/training.actions';
import * as fromTraining from './reducers/training.reducer';

const enum DatabaseCollectionsNames {
  availableExercises = 'availableExercises',
  finishedExercises = 'finishedExercises',
}

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private _firebaseSubscritions: Subscription[] = [];

  constructor(
    private _firestore: AngularFirestore,
    private _uiService: UIService,
    private _store: Store<fromTraining.State>
  ) {}

  public fetchAvailableExercises(): Subscription {
    this._store.dispatch(new fromUIActions.StartLoading());
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
          this._store.dispatch(new fromUIActions.StopLoading());
          this._store.dispatch(
            new TrainingActions.SetAvailableTrainings(exercises)
          );
        },
        (error) => {
          this._store.dispatch(new fromUIActions.StopLoading());
          this._uiService.showSnackBar('Fetching exercises failed', null, 3000);
          this._store.dispatch(new TrainingActions.SetAvailableTrainings([]));
        }
      );

    this._firebaseSubscritions.push(subscription);
    return subscription;
  }

  public startExercise(selectedId: string): void {
    this._firestore
      .doc(`${DatabaseCollectionsNames.availableExercises}/${selectedId}`)
      .update({ lastSelected: new Date() });

    this._store.dispatch(new TrainingActions.StartTraining(selectedId));
  }

  public completeExercise(): void {
    this._store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise: Exercise) => {
        this._addDataToDatabase({
          ...exercise,
          date: new Date(),
          state: 'completed',
        });
        this._store.dispatch(new TrainingActions.StopTraining());
      });
  }

  public cancelExercise(progress: number): void {
    this._store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise: Exercise) => {
        this._addDataToDatabase({
          ...exercise,
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        });
        this._store.dispatch(new TrainingActions.StopTraining());
      });
  }

  public fetchCompletedOrCancellExercises(): Subscription {
    const subscription = this._firestore
      .collection(DatabaseCollectionsNames.finishedExercises)
      .valueChanges()
      .subscribe((exercises: Exercise[]) =>
        this._store.dispatch(
          new TrainingActions.SetFinishedTrainings(exercises)
        )
      );
    this._firebaseSubscritions.push(subscription);
    return subscription;
  }

  private _addDataToDatabase(exercise: Exercise): void {
    this._firestore
      .collection(DatabaseCollectionsNames.finishedExercises)
      .add(exercise);
  }

  public cancelSubscriptions(): void {
    this._firebaseSubscritions.forEach((sub) => sub.unsubscribe());
  }
}
