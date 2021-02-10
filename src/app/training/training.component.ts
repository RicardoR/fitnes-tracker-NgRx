import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromTraining from './reducers/training.reducer';
import { TrainingService } from './training.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  public ongoingTraining$: Observable<boolean>;

  constructor(
    private _trainingService: TrainingService,
    private _store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.ongoingTraining$ = this._store.select(fromTraining.getIsTraining);
  }
}
