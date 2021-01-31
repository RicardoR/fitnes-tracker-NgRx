import { Subscription } from 'rxjs/Subscription';
import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  private _exerciseSubscription: Subscription;
  public ongoingTraining = false;

  constructor(private _trainingService: TrainingService) {}

  ngOnInit(): void {
    this._exerciseSubscription = this._trainingService.exerciseChanged.subscribe(
      (exercise: Exercise) => (this.ongoingTraining = !!exercise)
    );
  }

  ngOnDestroy(): void {
    this._exerciseSubscription.unsubscribe();
  }
}
