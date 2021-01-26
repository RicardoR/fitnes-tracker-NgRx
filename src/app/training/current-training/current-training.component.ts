import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
    private _trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this._startOrResumeTimer();
  }

  private _startOrResumeTimer() {
    const step =
      (this._trainingService.getRunningExercise().duration / 100) * 1000;

    this._timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this._trainingService.completeExercise();
        clearInterval(this._timer);
      }
    }, step);
  }

  public cancelTraining() {
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
