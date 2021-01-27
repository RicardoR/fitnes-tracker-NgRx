import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public doFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}
