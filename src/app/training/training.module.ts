import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { trainingReducer } from './reducers/training.reducer';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
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

    TrainingRoutingModule,

    // Lazy loading reducer
    StoreModule.forFeature('training', trainingReducer),
  ],
})
export class TrainingModule {}
