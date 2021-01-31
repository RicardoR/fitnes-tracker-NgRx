import { UIService } from './../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public exercises: Exercise[] = [];
  public isLoading = true;

  private _componentSubscriptions: Subscription[] = [];

  constructor(
    private _trainingService: TrainingService,
    private _uiService: UIService
  ) {}

  ngOnInit(): void {
    this._componentSubscriptions.push(
      this._uiService.loadingStateChanged.subscribe(
        (state) => (this.isLoading = state)
      )
    );

    this._trainingService.fetchAvailableExercises();
    this._componentSubscriptions.push(
      this._trainingService.exercisesChanged.subscribe(
        (exercises: Exercise[]) => (this.exercises = exercises)
      )
    );
  }

  public onStartTraining(form: NgForm): void {
    this._trainingService.startExercise(form.value.selectedExercise);
  }

  ngOnDestroy(): void {
    this._componentSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }
}
