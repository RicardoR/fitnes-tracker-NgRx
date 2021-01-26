import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent implements OnInit {
  public dataSource = new MatTableDataSource<Exercise>();
  public displayedColumns: string[] = [
    'date',
    'name',
    'calories',
    'duration',
    'state',
  ];

  constructor(private _trainingService: TrainingService) {}

  ngOnInit(): void {
    this.dataSource.data = this._trainingService.getCompletedOrCancellExercises();
  }
}
