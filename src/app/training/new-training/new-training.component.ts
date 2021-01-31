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
  private _exerciseSubscription: Subscription;

  constructor(private _trainingService: TrainingService) {}

  ngOnInit(): void {
    this._trainingService.fetchAvailableExercises();
    this._exerciseSubscription = this._trainingService.exercisesChanged.subscribe(
      (exercises: Exercise[]) => (this.exercises = exercises)
    );
  }

  public onStartTraining(form: NgForm): void {
    this._trainingService.startExercise(form.value.selectedExercise);
  }

  ngOnDestroy(): void {
    this._exerciseSubscription.unsubscribe();
  }
}
