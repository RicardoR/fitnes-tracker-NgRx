import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromTraining from '../reducers/training.reducer';
import { Exercise } from './../models/exercise.model';
import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  public progress = 0;
  private _timer: any;

  constructor(
    private _dialog: MatDialog,
    private _trainingService: TrainingService,
    private _store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this._startOrResumeTimer();
  }

  private _startOrResumeTimer(): void {
    this._store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise: Exercise) => {
        const step = (exercise.duration / 100) * 1000;

        this._timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this._trainingService.completeExercise();
            clearInterval(this._timer);
          }
        }, step);
      });
  }

  public cancelTraining(): void {
    clearInterval(this._timer);

    const dialog = this._dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this._trainingService.cancelExercise(this.progress);
      } else {
        this._startOrResumeTimer();
      }
    });
  }
}
