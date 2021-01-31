import { NgForm } from '@angular/forms';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  public exercises: Exercise[] = [];

  constructor(private _trainingService: TrainingService) {}

  ngOnInit(): void {
    this._trainingService
      .getAvailableExercises()
      .subscribe((data: Exercise[]) => {
        console.log(data);
        this.exercises = data;
      });
  }

  public onStartTraining(form: NgForm): void {
    this._trainingService.startExercise(form.value.selectedExercise);
  }
}
