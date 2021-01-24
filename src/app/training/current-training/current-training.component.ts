import { StopTrainingComponent } from './stop-training.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();

  public progress = 0;
  private timer: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this._startOrResumeTimer();
  }

  private _startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  public cancelTraining() {
    clearInterval(this.timer);
    
    const dialog = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.trainingExit.emit();
      } else {
        this._startOrResumeTimer();
      }
    });
  }
}
