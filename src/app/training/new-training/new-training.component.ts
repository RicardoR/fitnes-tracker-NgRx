import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import * as fromRootReducer from './../../app.reducer';
import { TrainingService } from './../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public exercises: Exercise[] = [];
  public isLoading$: Observable<boolean>;

  private _exercisesChangedSubscription: Subscription;

  constructor(
    private _trainingService: TrainingService,
    private _store: Store<fromRootReducer.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromRootReducer.getIsLoading);

    this._exercisesChangedSubscription = this._trainingService.exercisesChanged.subscribe(
      (exercises: Exercise[]) => (this.exercises = exercises)
    );

    this.fetchExercises();
  }

  public fetchExercises(): void {
    this._trainingService.fetchAvailableExercises();
  }

  public onStartTraining(form: NgForm): void {
    this._trainingService.startExercise(form.value.selectedExercise);
  }

  ngOnDestroy(): void {
    this._exercisesChangedSubscription.unsubscribe();
  }
}
