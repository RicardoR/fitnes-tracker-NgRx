import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent } from './training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
    TrainingComponent,
  ],
  imports: [
    // Angular
    AngularFirestoreModule,

    SharedModule,
  ],
})
export class TrainingModule {}
