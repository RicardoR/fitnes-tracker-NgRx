import { Subscription } from 'rxjs/Subscription';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _exerciseSubscription: Subscription;

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
    this._trainingService.fetchCompletedOrCancellExercises();
    this._exerciseSubscription = this._trainingService.finishedExercisesChanged.subscribe(
      (exercises: Exercise[]) => (this.dataSource.data = exercises)
    );
  }

  public doFilter(filter: string): void {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    if (this._exerciseSubscription) {
      this._exerciseSubscription.unsubscribe();
    }
  }
}
