import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Exercise } from '../models/exercise.model';
import * as fromTraining from '../reducers/training.reducer';
import { TrainingService } from './../training.service';
@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSource = new MatTableDataSource<Exercise>();
  public displayedColumns: string[] = [
    'date',
    'name',
    'calories',
    'duration',
    'state',
  ];

  constructor(
    private _trainingService: TrainingService,
    private _store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this._trainingService.fetchCompletedOrCancellExercises();

    this._store
      .select(fromTraining.getFinishedExercises)
      .subscribe((exercises: Exercise[]) => (this.dataSource.data = exercises));
  }

  public doFilter(filter: string): void {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
