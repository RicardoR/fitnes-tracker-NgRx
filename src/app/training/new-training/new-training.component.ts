import { Component, OnInit, EventEmitter, Output } from '@angular/core';

interface Exercise {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  public exercises: Exercise[];

  @Output()
  public trainingStart = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    this.exercises = [
      { value: 'crunches', viewValue: 'Chrunches' },
      { value: 'touch-toes', viewValue: 'Touch toes' },
      { value: 'side-lunges', viewValue: 'Side lunges' },
      { value: 'burpees', viewValue: 'Burpees' },
    ];
  }

  public onStartTraining() {
    this.trainingStart.emit();
  }
}
