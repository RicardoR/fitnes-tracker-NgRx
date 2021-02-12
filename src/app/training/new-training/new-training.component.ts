import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import * as fromTraining from '../reducers/training.reducer';
import * as fromRootReducer from './../../app.reducer';
import { TrainingService } from './../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  public exercises$: Observable<Exercise[]>;
  public isLoading$: Observable<boolean>;

  constructor(
    private _trainingService: TrainingService,
    private _store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this._store.select(fromRootReducer.getIsLoading);
    this.exercises$ = this._store.select(fromTraining.getAvailableExercises);
    this.exercises$.subscribe((data) => console.log('data', data));
    this.fetchExercises();
  }

  public fetchExercises(): void {
    this._trainingService.fetchAvailableExercises();
  }

  public onStartTraining(form: NgForm): void {
    this._trainingService.startExercise(form.value.selectedExercise);
  }
}
